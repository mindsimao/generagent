with open('index.html', 'r') as f:
    lines = f.readlines()

sections = []
current_section = None
in_section_content = False

for i, line in enumerate(lines, 1):
    if 'class="collapsible-section"' in line:
        current_section = {'start': i, 'name': None, 'content_start': None, 'content_end': None, 'end': None}
    elif current_section and 'section-title">' in line:
        # Extract section name
        start = line.find('section-title">') + 15
        end = line.find('</span>', start)
        current_section['name'] = line[start:end].strip()
    elif current_section and 'class="section-content' in line:
        current_section['content_start'] = i
        in_section_content = True
    elif in_section_content:
        # Look for closing of section-content (should have specific indentation)
        stripped = line.strip()
        if stripped == '</div>' and 'section-content' not in line:
            # Check indentation to see if this closes section-content
            spaces = len(line) - len(line.lstrip())
            if spaces <= 20:  # Likely closing section-content or collapsible-section
                if current_section['content_end'] is None:
                    current_section['content_end'] = i
                else:
                    current_section['end'] = i
                    sections.append(current_section)
                    current_section = None
                    in_section_content = False

for sec in sections:
    print(f"\n{sec['name']}")
    print(f"  Section: lines {sec['start']}-{sec['end']}")
    print(f"  Content: lines {sec['content_start']}-{sec['content_end']}")
    print(f"  Lines in content: {sec['content_end'] - sec['content_start']}")
