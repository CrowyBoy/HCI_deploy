"""
import os
absolute_path = os.path.dirname(__file__)
print(absolute_path)
absolute_path = os.path.dirname(absolute_path)
absolute_path = os.path.dirname(absolute_path)
print(absolute_path)
relative_path = "front/public"
full_path = os.path.join(absolute_path, relative_path)
files = folders = 0

for _,dirnames, filenames in os.walk(full_path):
  # ^ this idiom means "we won't be using this value"
  print(dirnames)
  if len(filenames) == 4:
    files += len(filenames)
    print(filenames)
print (f"{files} files")
folders = [f for f in os.listdir(full_path) if os.path.isdir(os.path.join(full_path, f))]
print(folders)
print(os.listdir(full_path))
"""

