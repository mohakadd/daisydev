import sys

with open('notre-equipe.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '<!-- DEBUT LISTE COLISTIERS -->'
end_marker = '<!-- FIN LISTE COLISTIERS -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
    new_html = '''        <!-- DEBUT LISTE COLISTIERS -->
        <section id="colistiers-list" style="padding: 2rem 0 4rem 0; background-color: #fcfcfc;">
            <div class="container" id="colistiers-list-container">
            </div>
        </section>
'''
    new_content = content[:start_idx] + new_html + content[end_idx:]
    with open('notre-equipe.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("HTML cleanup successful.")
else:
    print("Markers not found.")
