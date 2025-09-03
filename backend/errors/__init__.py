from pydantic import BaseModel

from .auth import *
from .user import *


class AppError(Exception):
    def __init__(self, Model):
        self.body = Model()
