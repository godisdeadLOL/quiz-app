from fastapi import Header


def session_key_scheme(x_session_key: str = Header()):
    return x_session_key
