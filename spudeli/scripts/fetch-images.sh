#!/usr/bin/env bash
# Fetch Spüdeli imagery into public/img at build time.
#  - hero/atmosphere/signature/sweet-potato: AI-generated concept photography
#    (Higgsfield), hosted on the owner's Higgsfield CDN (stable).
#  - real* : the business's own photos from Instagram (@spudeli_). Instagram
#    CDN links are time-limited, so these are baked into the build when it runs.
# Missing images never fail the build.
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/img"
mkdir -p "$DIR"
HF="https://d8j0ntlcm91z4.cloudfront.net/user_3C8OkTgGhJ23GOJgkItDmo6xIYC"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"

g() { curl -fsSL -o "$DIR/$1" "$HF/$2" && echo "img $1" || echo "MISS $1"; }
r() { curl -fsSL -A "$UA" -o "$DIR/$1" "$2" && echo "img $1" || echo "MISS $1"; }

# --- generated concept imagery (webp) ---
g hero.webp       hf_20260914_120607_b88d35af-c2cf-43a3-9899-0001837757b7_min.webp
g smoke.webp      hf_20260914_120608_f14bfc7c-cea1-4e19-9b60-27733490c540_min.webp
g brisket.webp    hf_20260914_120606_319a243e-f706-4797-a531-1a2a20cc65e9_min.webp
g steakhouse.webp hf_20260914_120606_db369f2c-a236-4d26-8256-5ad980aa3e28_min.webp
g pulledpork.webp hf_20260914_120606_31f4f422-06f4-437b-b4b7-573812c1fd0d_min.webp
g brownie.webp    hf_20260914_120606_49d10aae-42ca-4a40-8ee0-49372b9f21c2_min.webp
g interior.webp   hf_20260914_120605_95ba2e23-bed7-4fa1-8937-895b7b15d2e7_min.webp
g embers.webp     hf_20260914_120605_8f73e698-342c-4d0b-8448-4a02ce79d1b7_min.webp
g sphero.webp     hf_20260914_124644_2eb41af4-f4e9-4271-8ad5-6dfcf307d74a_min.webp
g spbenefit.webp  hf_20260914_124644_9793c5e5-75d8-4f69-8846-e4489f490ee0_min.webp
g sploaded.webp   hf_20260914_124644_93968b49-bd40-49a0-be13-a6227e5d4fd3_min.webp

g enterbg.webp    hf_20260914_132635_2a51b2c5-d1c4-401e-86ac-bdc3cd647360_min.webp
g enterbgv.webp   hf_20260914_132636_fa3b99f3-4e02-4ed5-8a48-5634ca1cfc33_min.webp

# --- Spüdeli's real logo (their Instagram brand mark) ---
curl -fsSL -o "$DIR/logo.png" "https://d2ol7oe51mr4n9.cloudfront.net/user_3C8OkTgGhJ23GOJgkItDmo6xIYC/346cd49c-db18-43e0-9392-ea8413d05c0b.png" && echo "img logo.png" || echo "MISS logo.png"
curl -fsSL -o "$DIR/logomark.png" "https://d8j0ntlcm91z4.cloudfront.net/user_3C8OkTgGhJ23GOJgkItDmo6xIYC/hf_20260914_131903_b5b86e4d-e881-4e9b-a1ff-628293b9c1ea.png" && echo "img logomark.png" || echo "MISS logomark.png"

# --- real photos from Instagram @spudeli_ (baked in at build time) ---
r real1.jpg "https://scontent-sea1-1.cdninstagram.com/v/t51.82787-15/670264080_17865479697656046_5553689785234880511_n.heic?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGjQMfvqk1f0rfryFWXE6eq1X8nAektVvnmBGH17xAPnAS91yeCmdlIFLLlt_ijBoY&_nc_ohc=DAb28m8SWq4Q7kNvwGUF5Gz&_nc_gid=531Gs8VURLJE5fUJ_dM4pg&edm=AOQ1c0wBAAAA&ccb=7-5&ig_cache_key=Mzg3MjI0Mzc4OTY5NjA4NTIwMQ%3D%3D.3-ccb7-5&oh=00_AQLhVt-mI5sXTPK6Q45oRKVSyoFAqVqIMbuSvn-1SrZz9g&oe=6AADA533&_nc_sid=8b3546"
r real2.jpg "https://scontent-sea5-1.cdninstagram.com/v/t51.82787-15/797722968_17890944132674261_3915918575495612450_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-sea5-1.cdninstagram.com&_nc_cat=105&_nc_oc=Q6cZ2gGjQMfvqk1f0rfryFWXE6eq1X8nAektVvnmBGH17xAPnAS91yeCmdlIFLLlt_ijBoY&_nc_ohc=jAQDcwc0qWUQ7kNvwF3iUfE&_nc_gid=531Gs8VURLJE5fUJ_dM4pg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQKDBNnCBiTLXBD78FznLFkyG-Verhk7P9BLqrnr6NR_uQ&oe=6AADAC9C&_nc_sid=8b3546"
r real3.jpg "https://scontent-sea5-1.cdninstagram.com/v/t51.71878-15/773714301_1100782959307819_4454976586312525703_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-sea5-1.cdninstagram.com&_nc_cat=107&_nc_oc=Q6cZ2gGjQMfvqk1f0rfryFWXE6eq1X8nAektVvnmBGH17xAPnAS91yeCmdlIFLLlt_ijBoY&_nc_ohc=HuVz6Su2i7gQ7kNvwETsKuV&_nc_gid=531Gs8VURLJE5fUJ_dM4pg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQIAWXXQQb-6M8yQGLt8w-nfPxhFtHUocK2LjZpjFYYATA&oe=6AADBBCD&_nc_sid=8b3546"
r real4.jpg "https://scontent-sea1-1.cdninstagram.com/v/t51.71878-15/762252386_1262769982515018_5431096327134916105_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGjQMfvqk1f0rfryFWXE6eq1X8nAektVvnmBGH17xAPnAS91yeCmdlIFLLlt_ijBoY&_nc_ohc=qef99sswyLUQ7kNvwEOK1fe&_nc_gid=531Gs8VURLJE5fUJ_dM4pg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQLaEIlL9Fi85RjKjJh8RUQgDnLFxvmW05dp_9-sVXpGow&oe=6AADD9F1&_nc_sid=8b3546"
echo "images: $(ls -1 "$DIR" | grep -cE '\.(webp|jpg)$') files"
