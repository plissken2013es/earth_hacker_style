cat src/lib/pre.js

if [ "$NODE_ENV" == "production" ]; then
  cat src/lib/env_prod.js
else
  cat src/lib/env_dev.js
fi;

# libs

cat src/lib/utils.js
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

#cat src/js/setup.js
#cat src/js/state.js
#cat src/js/sounds.js
#cat src/js/input.js
#cat src/js/behaviors.js
#cat src/js/ai.js
#cat src/js/asteroids.js
#cat src/js/asteroidsIncoming.js
#cat src/js/bullets.js
#cat src/js/particles.js
#cat src/js/spaceship.js
#cat src/js/ufo.js
#cat src/js/ui.js
#cat src/js/effects.js
cat src/js/game.js

cat src/lib/post.js
