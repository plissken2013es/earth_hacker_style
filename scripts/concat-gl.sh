# only shaders

cd build;
for glsl in *.frag *.vert; do
  name=`echo $glsl | tr '.' '_' | tr '[:lower:]' '[:upper:]'`
  cat $glsl | bash ../scripts/wrapjs.sh $name
  echo
done
cd ..;
