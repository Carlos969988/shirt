import { Hud, OrthographicCamera, Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import Button from './Button'

export default function MaterialMenu({ setSelected }) {
  const texture = useLoader(TextureLoader, [
    './img/cerrar-detalle-textura-ropa-acogedora.jpg',
    './img/cerrar-detalles-textura-lana.jpg',
    './img/cerrar-textura-tela.jpg',
    './img/jersey-lana-rojo.jpg',
    './img/endecha-plana-tela.jpg',
    './img/fondo-textura-raso-blanco.jpg'

  ])

  return (
    <Hud>
      <OrthographicCamera makeDefault position={[0  , -11, 2]} zoom={40} />
      <Environment preset="forest" />
      <Button id={0} texture={texture[0]} position={[-5, -4.5, 0]} setSelected={setSelected} />
      <Button id={1} texture={texture[1]} position={[-2.5, -4.5, 0]} roughness={0.2} setSelected={setSelected} />
      <Button id={2} texture={texture[2]} position={[-0, -4.5, 0]} setSelected={setSelected} />
      <Button id={3} texture={texture[3]} position={[2.5, -4.5, 0]} roughness={0.5} setSelected={setSelected} />
      <Button id={4} texture={texture[4]} position={[5, -4.5, 0]} setSelected={setSelected} />
      <Button id={5} texture={texture[5]} position={[2.5, -4.5, 0]} roughness={0.5} setSelected={setSelected} />
    </Hud>
  )
}