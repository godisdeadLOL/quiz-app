def to_camel_case(line: str):
    line = line.title().replace("_", "")
    return line[0].lower() + line[1:]
