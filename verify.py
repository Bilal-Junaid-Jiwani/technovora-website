import json
import re

with open('d:\\new technovora\\technovora-website\\components\\layout\\I18nProvider.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '"about.hero.title"' in line:
        start_idx = i
    if '"services.cta.button"' in line:
        end_idx = i

if start_idx != -1 and end_idx != -1:
    extracted_keys = []
    for line in lines[start_idx:end_idx+1]:
        match = re.search(r'"([a-zA-Z0-9_.-]+)"\s*:', line)
        if match:
            extracted_keys.append(match.group(1))

    print(f'Extracted {len(extracted_keys)} keys from I18nProvider.tsx')

    with open('d:\\new technovora\\technovora-website\\translations_tmp\\1.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for lang in ['zh-CN', 'ja', 'de', 'nl']:
        lang_keys = list(data[lang].keys())
        print(f'Language {lang} has {len(lang_keys)} keys')
        
        missing_keys = set(extracted_keys) - set(lang_keys)
        if missing_keys:
            print(f'Missing keys in {lang}: {missing_keys}')
        
        extra_keys = set(lang_keys) - set(extracted_keys)
        if extra_keys:
            print(f'Extra keys in {lang}: {extra_keys}')
