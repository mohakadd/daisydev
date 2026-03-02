import sys

with open('colistiers_output.html', 'r', encoding='utf-8') as f:
    colistiers_html = f.read()

with open('notre-equipe.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '<!-- DEBUT LISTE COLISTIERS -->'
end_marker = '<!-- FIN LISTE COLISTIERS -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
    new_content = content[:start_idx] + colistiers_html + content[end_idx + len(end_marker):]
    with open('notre-equipe.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Update successful.")
else:
    print("Markers not found.")
