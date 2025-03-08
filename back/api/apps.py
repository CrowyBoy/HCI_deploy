from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    
    def ready(self):
        import os, json
        if os.environ.get('RUN_MAIN'):
            from .models import Post, Uploader, UploaderTags
            """
            print("in get query")
            numOfPhoto = 4
            absolute_path = os.path.dirname(__file__)
            absolute_path = os.path.dirname(absolute_path)
            absolute_path = os.path.dirname(absolute_path)
            relative_path = "front/public"
            full_path = os.path.join(absolute_path, relative_path)
            files = 0
            for _,_, filenames in os.walk(full_path):
            # ^ this idiom means "we won't be using this value"
                if len(filenames) == numOfPhoto:
                    files += len(filenames)
            DBElementNum = Post.objects.all().count()
            print(f"{DBElementNum} amount of element in db")
            print(f"{files} amount of elements actually")
            if files != DBElementNum:
                try:
                    Post.objects.all().delete()
                    Uploader.objects.all().delete()
                except:
                    pass                
                folders = [f for f in os.listdir(full_path) if os.path.isdir(os.path.join(full_path, f))]
                print(f"{folders} folders content")
                for uploader in folders:
                    CurrentUploader = Uploader(username=uploader, pfp=f"{uploader}/pfp/pfp.jpg")
                    print(CurrentUploader)
                    CurrentUploader.save()
                print("we got to line 34")
                for uploader in folders:
                    print(uploader)
                    with open(os.path.join(absolute_path,f"back/profiles/{uploader}.json"),"r") as file:
                        data = json.load(file)
                    tags = data["tags"]
                    print(tags)
                    upobj=Uploader.objects.get(username=uploader)
                    print(upobj)
                    currentTags = UploaderTags(uploader=upobj, fluffy=tags["fluffy"], majestic=tags["majestic"], funny=tags["funny"], outfit=tags["outfit"])
                    print(currentTags)
                    currentTags.save()
                counter = 0
                for _,_, filenames in os.walk(full_path):
                    if len(filenames) == numOfPhoto:
                        counter+=1
                        for file in filenames:
                            print(f"counter is {counter}")
                            print(Uploader.objects.all())
                            post = Post(posterid=Uploader.objects.get(username=folders[counter-1]), content=f"{folders[counter-1]}/{file}")
                            post.save()
                            """
            uploaders = ['crunch','ginger','grumpy','hamilton','nala','venus']
            tags = [{"fluffy":False, "majestic":False, "funny":True, "outfit":False},
                    {"fluffy":False, "majestic":False, "funny":True, "outfit":False},
                    {"fluffy":False, "majestic":False, "funny":True, "outfit":True},
                    {"fluffy":True, "majestic":True, "funny":False, "outfit":False},
                    {"fluffy":False, "majestic":True, "funny":False, "outfit":True},
                    {"fluffy":False, "majestic":True, "funny":False, "outfit":False}]
            files=[['1.jpg','2.jpg','3.jpg','4.jpg'],
                   ['ginger 1.jpeg','ginger 2.jpeg','ginger 3.jpeg','ginger 4.jpeg'],
                   ['grumpy 1.jpeg','grumpy 2.jpeg','grumpy 3.jpeg','grumpy 4.jpeg'],
                   ['hamilton 1.jpeg','hamilton 2.jpeg','hamilton 3.jpeg','hamilton 4.jpeg'],
                   ['1.jpg','2.jpg','3.jpg','4.jpg'],
                   ['1.jpg','2.jpg','3.jpg','4.jpg'],]
            for uploader in uploaders:
                CurrentUploader = Uploader(username=uploader, pfp=f"{uploader}/pfp/pfp.jpg")
                CurrentUploader.save()
            for uploader, tag in zip(uploaders, tags):
                upobj=Uploader.objects.get(username=uploader)
                currentTags = UploaderTags(uploader=upobj, fluffy=tag["fluffy"], majestic=tag["majestic"], funny=tag["funny"], outfit=tag["outfit"])
                currentTags.save()
            for uploader,file in zip(uploaders,files):
                for filename in file:
                    post = Post(posterid=Uploader.objects.get(username=uploader), content=f"{uploader}/{filename}")
                    post.save()
        return