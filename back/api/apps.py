from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    
    def ready(self):
        import os
        from .models import Post, Uploader
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
            counter = 0
            for _,_, filenames in os.walk(full_path):
                if len(filenames) == numOfPhoto:
                    counter+=1
                    for file in filenames:
                        print(f"counter is {counter}")
                        print(Uploader.objects.all())
                        post = Post(posterid=Uploader.objects.get(username=folders[counter-1]), content=f"{folders[counter-1]}/{file}")
                        post.save()
        return
