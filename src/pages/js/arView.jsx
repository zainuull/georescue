import 'aframe';

const ARView = () => (
  <a-scene embedded arjs>
    <a-marker preset="hiro">
      <a-entity
        geometry="primitive: box; width: 1; height: 1; depth: 1;"
        material="color: red;"></a-entity>
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
);

export default ARView;
