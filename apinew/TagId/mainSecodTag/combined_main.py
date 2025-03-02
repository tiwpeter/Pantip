import json
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time

driver = webdriver.Chrome()

def wait_for_image_to_load(element, timeout=10):
    try:
        WebDriverWait(driver, timeout).until(
            EC.visibility_of(element)
        )
        return True
    except Exception as e:
        print(f"Image failed to load: {e}")
        return False

def scrape_data(url):
    driver.get(url)

    data = {
        'sections': [],
        'breadcrumb_links': []
    }

    try:
        breadcrumb_div = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'div.pt-breadcrumb'))
        )
        breadcrumb_links = breadcrumb_div.find_elements(By.TAG_NAME, 'a')
        
        for link in breadcrumb_links:
            text = link.text
            href = link.get_attribute('href')
            data['breadcrumb_links'].append({'text': text, 'url': href})
    except Exception as e:
        print(f"Error extracting breadcrumb links: {e}")

    try:
        sections = WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div.pt-block.pt-block-purple-2.m-b-20'))
        )

        for section in sections:
            header_text = section.find_element(By.CSS_SELECTOR, 'div.pt-block-header.pt-block-header-purple-1.flex-column').text
            
            container = section.find_element(By.CSS_SELECTOR, "ul")

            titles = []

            list_items = container.find_elements(By.CSS_SELECTOR, "li")
            
            for li in list_items:
                img_url = "not found url"
                h5_texts = []
                span_texts = []
                comment_count = "not found"
                vote_count = "not found"

                try:
                    img_div = li.find_element(By.CSS_SELECTOR, 'div.pt-list-item__img.img-thumbnail')
                    ActionChains(driver).move_to_element(img_div).perform()
                    if wait_for_image_to_load(img_div):
                        img_url = img_div.get_attribute('data-bg') or img_div.get_attribute('src')
                except Exception as e:
                    print(f"Error extracting image URL: {e}")

                try:
                    info_div = li.find_element(By.CSS_SELECTOR, 'div.pt-list-item__info')
                    h5_elements = info_div.find_elements(By.XPATH, ".//h5")
                    span_elements = info_div.find_elements(By.XPATH, ".//span")
                    h5_texts = [h5.text for h5 in h5_elements]
                    span_texts = [span.text for span in span_elements]
                except Exception as e:
                    print(f"Error extracting text info: {e}")

                try:
                    item__stats = li.find_element(By.CSS_SELECTOR, 'div.pt-list-item__stats')
                    comment_count = item__stats.find_element(By.CSS_SELECTOR, 'span.pt-li_stats-comment').text
                    vote_count = item__stats.find_element(By.CSS_SELECTOR, 'span.pt-li_stats-vote').text
                except Exception as e:
                    print(f"Error extracting stats: {e}")

                try:
                    title_div = li.find_element(By.CSS_SELECTOR, 'div.pt-list-item__title')
                    h2_elements = title_div.find_elements(By.XPATH, ".//h2")
                    for h2 in h2_elements:
                        a_elements = h2.find_elements(By.XPATH, ".//a")
                        for a in a_elements:
                            text = a.text
                            href = a.get_attribute('href')

                            titles.append({
                                'Title-Topic': text,
                                'pantip-trend-linkTopic': href,
                                'img_url': img_url,
                                'user': h5_texts,
                                'timePost': span_texts,
                                'comments': comment_count,
                                'votes': vote_count,
                                'img': img_url
                            })
                except Exception as e:
                    print(f"Error extracting title and URL: {e}")

            data['sections'].append({
                'header': header_text,
                'titles': titles
            })

    except Exception as e:
        print(f"Error extracting sections: {e}")

    time.sleep(5)

    return data

def main(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        urls_data = json.load(f)

    all_data = {}

    for title, url in urls_data.items():
        if url:  # Ensure that URL is not None
            print(f"Scraping data from: {url}")
            data = scrape_data(url)
            breadcrumb_text = data['breadcrumb_links'][-1]['text'] if data['breadcrumb_links'] else 'Unknown'
            all_data[breadcrumb_text] = data
        else:
            print(f"URL for '{title}' is None, skipping this URL.")

    with open('consolidated_data.json', 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=4)

    print("ข้อมูลถูกบันทึกลงในไฟล์ consolidated_data.json")

    for breadcrumb_text, data in all_data.items():
        print(f"\nData for Breadcrumb Text: {breadcrumb_text}")
        for section in data['sections']:
            print(f"\nSection Header: {section['header']}")
            for title in section['titles']:
                print("\nTitle-Topic:", title['Title-Topic'])
                print("pantip-trend-linkTopic:", title['pantip-trend-linkTopic'])
                print("Image URL:", title.get('img_url', 'not found'))
                print("User:", title['user'])
                print("Time Post:", title['timePost'])
                print("Comments:", title['comments'])
                print("Votes:", title['votes'])

    print("\nBreadcrumb Links:")
    for breadcrumb in data['breadcrumb_links']:
        print(f"Text: {breadcrumb['text']}, URL: {breadcrumb['url']}")

try:
    main('headers_links.json')  # ระบุชื่อไฟล์ JSON ของคุณ
finally:
    driver.quit()
