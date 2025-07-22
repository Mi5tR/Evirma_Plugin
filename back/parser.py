import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
import glob

def click_on_aukc(search_query, hash):
    profile_dir = os.path.abspath("Profile")
    download_dir = os.path.abspath("tables")

    filename = hash

    options = Options()
    options.add_argument(f"user-data-dir={profile_dir}")
    options.add_experimental_option("detach", True)
    options.add_experimental_option("prefs", {
        "download.default_directory": download_dir,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "safebrowsing.enabled": True
    })
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(f"https://www.wildberries.ru/catalog/0/search.aspx?search={search_query}")

    wait = WebDriverWait(driver, 20)
    time.sleep(5)

    try:
        aukc_cell = wait.until(EC.presence_of_element_located((
            By.XPATH,
            "/html/body/div[1]/main/div[2]/div[1]/div/div/div/div/div[4]/div/div/div/div[2]/div[1]/div[2]/div[2]/div/div[3]/div[2]/div[2]/div[3]/div[1]/div[2]/div/div[8]/div[4]"
        )))
        actions = ActionChains(driver)
        actions.move_to_element(aukc_cell).click().perform()
        time.sleep(0.5)
        actions.context_click(aukc_cell).perform()

        export_button_xpath = "/html/body/div[7]/div/div/div[5]/span[2]"
        export_button = wait.until(EC.element_to_be_clickable((By.XPATH, export_button_xpath)))
        export_button.click()

        time.sleep(2)
        export_text_xpath = "//span[normalize-space(text())='Экспорт в Excel (.xlsx)']"
        export_excel_btn = wait.until(EC.element_to_be_clickable((By.XPATH, export_text_xpath)))
        export_excel_btn.click()

        list_of_files = glob.glob(os.path.join(download_dir, '*.xlsx'))
        if list_of_files:
            latest_file = max(list_of_files, key=os.path.getctime)
            new_filename = os.path.join(download_dir, f"{filename}.xlsx")
            try:
                os.rename(latest_file, new_filename)
                print(f"Файл переименован в: {new_filename}")
            except Exception as e:
                print(f"Ошибка при переименовании: {e}")
        else:
            print("Excel файл не найден.")

    except Exception as e:
        print(e)

    time.sleep(3)
    driver.quit()

