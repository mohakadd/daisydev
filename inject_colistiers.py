import sys

with open('colistiers_output.html', 'r', encoding='utf-8') as f:
    colistiers_html = f.read()

with open('notre-equipe.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Insert before <section id="join-us-banner" 
insert_marker = '<section id="join-us-banner"'

if insert_marker in content:
    new_content = content.replace(insert_marker, colistiers_html + "\n\n        " + insert_marker)
    with open('notre-equipe.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Injection successful.")
else:
    print("Marker not found.")
