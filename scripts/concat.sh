cat src/lib/pre.js

if [ "$NODE_ENV" == "production" ]; then
  cat src/lib/env_prod.js
else
  cat src/lib/env_dev.js
fi;

# libs

cat src/lib/utils.js
cat src/lib/mat.js
cat src/lib/gre-path.js
cat src/lib/gre-asteroids.font.js
cat src/lib/webgl.js

# shaders

cd build;
for glsl in *.frag *.vert; do
  name=`echo $glsl | tr '.' '_' | tr '[:lower:]' '[:upper:]'`
  cat $glsl | bash ../scripts/wrapjs.sh $name
  echo
done
cd ..;

# game

cat src/js/game.js
cat src/js/worldmap.js
cat src/js/main.js

cat src/lib/post.js
