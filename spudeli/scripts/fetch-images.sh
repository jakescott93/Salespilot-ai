#!/usr/bin/env bash
# Fetch the Spüdeli imagery into public/img at build time.
# Images are AI-generated concept photography (Higgsfield), hosted on the
# owner's Higgsfield CDN. Replace with real Spüdeli food photos when available.
set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/img"
mkdir -p "$DIR"
B="https://d8j0ntlcm91z4.cloudfront.net/user_3C8OkTgGhJ23GOJgkItDmo6xIYC"
declare -A M=(
  [hero]="hf_20260914_120607_b88d35af-c2cf-43a3-9899-0001837757b7_min.webp"
  [smoke]="hf_20260914_120608_f14bfc7c-cea1-4e19-9b60-27733490c540_min.webp"
  [brisket]="hf_20260914_120606_319a243e-f706-4797-a531-1a2a20cc65e9_min.webp"
  [steakhouse]="hf_20260914_120606_db369f2c-a236-4d26-8256-5ad980aa3e28_min.webp"
  [pulledpork]="hf_20260914_120606_31f4f422-06f4-437b-b4b7-573812c1fd0d_min.webp"
  [brownie]="hf_20260914_120606_49d10aae-42ca-4a40-8ee0-49372b9f21c2_min.webp"
  [interior]="hf_20260914_120605_95ba2e23-bed7-4fa1-8937-895b7b15d2e7_min.webp"
  [embers]="hf_20260914_120605_8f73e698-342c-4d0b-8448-4a02ce79d1b7_min.webp"
)
for k in "${!M[@]}"; do
  curl -fsSL -o "$DIR/$k.webp" "$B/${M[$k]}" && echo "fetched $k.webp"
done
