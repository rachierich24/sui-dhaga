import os
from PIL import Image, ImageEnhance, ImageOps

public_dir = r"c:\Users\shriyansh Sharma\Downloads\suidhaga\sui-dhaga\public"

def enhance_image(img_path, out_path):
    try:
        with Image.open(img_path) as img:
            # Convert to RGB in case it's not
            img = img.convert('RGB')
            
            # Enhance contrast slightly
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(1.15)
            
            # Enhance color (saturation)
            enhancer = ImageEnhance.Color(img)
            img = enhancer.enhance(1.1)
            
            # Enhance sharpness
            enhancer = ImageEnhance.Sharpness(img)
            img = enhancer.enhance(1.2)
            
            # Save
            img.save(out_path, quality=90)
            print(f"Processed: {out_path}")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

for i in range(1, 15):
    raw_path = os.path.join(public_dir, f"raw_photo_{i}.jpeg")
    if not os.path.exists(raw_path):
        continue
        
    if i == 1:
        out_path = os.path.join(public_dir, "cmo_camellia.jpeg")
    else:
        out_path = os.path.join(public_dir, f"creative_{i}.jpeg")
        
    enhance_image(raw_path, out_path)
