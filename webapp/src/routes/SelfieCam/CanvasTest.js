// import React, { useState, useRef, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import { Stage, Layer, Image } from 'react-konva'
// // import useImage from 'use-image'

// // the first very simple and recommended way:
// // const LionImage = props => {
// //   const [image] = useImage('https://konvajs.org/assets/lion.png')
// //   return <Image image={image} {...props} />
// // }

// const URLImage = props => {
//   const [state, setState] = useState({
//     image: null
//   })

//   const loadImage = () => {
//     // save to "this" to remove "load" handler on unmount
//     const image = new window.Image()
//     image.src = props.src

//     setState({
//       image
//     })
//   }

//   useEffect(() => {
//     loadImage()
//   }, [props])

//   return (
//     <Image
//       x={props.x}
//       y={props.y}
//       image={state.image}
//       // ref={node => {
//       //   imageNode = node
//       // }}
//     />
//   )
// }

// URLImage.propTypes = {
//   x: PropTypes.any,
//   y: PropTypes.any,
//   src: PropTypes.any
// }

// const Test = ({ selfie }) => {
//   // const [state, setState] = useState({
//   //   isDragging: false,
//   //   x: 50,
//   //   y: 50
//   // })
//   const stageRef = useRef()

//   const downloadURI = (uri, name) => {
//     console.log({ uri, name })
//     // const link = document.createElement('a')
//     // link.download = name
//     // link.href = uri
//     // document.body.appendChild(link)
//     // link.click()
//     // document.body.removeChild(link)
//   }

//   const handleSaveImage = event => {
//     event.preventDefault()
//     if (stageRef.current) {
//       const dataURL = stageRef.current.toDataURL()
//       console.log({ dataURL: stageRef.current.canvas })

//       downloadURI(dataURL, 'test')
//     }
//   }

//   return (
//     <>
//       <Stage
//         width={window.innerWidth}
//         height={300}
//         style={{
//           border: '1px solid red',
//           backgroundImage: `url("${selfie}")`
//         }}
//         ref={stageRef}
//       >
//         <Layer>
//           <URLImage src="https://konvajs.org/assets/yoda.jpg" x={150} />
//           {/* <LionImage
//             x={state.x}
//             y={state.y}
//             draggable
//             fill={state.isDragging ? 'green' : 'black'}
//             onDragStart={() => {
//               console.log({ teto: stageRef.current.toDataURL() })

//               setState({
//                 isDragging: true
//               })
//             }}
//             onDragEnd={e => {
//               setState({
//                 isDragging: false,
//                 x: e.target.x(),
//                 y: e.target.y()
//               })
//             }}
//           /> */}
//         </Layer>
//       </Stage>
//       <button onClick={handleSaveImage}>Save Image</button>
//     </>
//   )
// }

// Test.propTypes = {
//   selfie: PropTypes.string
// }

// export default Test

import React, { useEffect } from 'react'
import { Stage, Layer, Star } from 'react-konva'
import PropTypes from 'prop-types'

// function generateShapes() {
//   return [...Array(1)].map((_, i) => ({
//     id: i.toString(),
//     x: Math.random() * 300,
//     y: Math.random() * 300,
//     rotation: Math.random() * 180,
//     isDragging: false
//   }))
// }

// const INITIAL_STATE = generateShapes()

const Test = ({ selfie, nftUrl }) => {
  const [dataUrl, setDataUrl] = React.useState()
  const [star, setStar] = React.useState({
    id: '21',
    x: 50,
    y: 50,
    rotation: 0,
    isDragging: false
  })
  const stageRef = React.useRef()
  const canvas = React.useRef()
  const nftImg = React.useRef()

  const handleDragStart = e => {
    const id = e.target.id()
    setStar({
      ...star,
      isDragging: star.id === id
    })
  }

  const handleDragEnd = e => {
    setStar({
      ...star,
      x: e.target.x(),
      y: e.target.y(),
      isDragging: false
    })

    downloadURI({ x: e.target.x(), y: e.target.y() })
  }

  const downloadURI = ({ x, y }) => {
    // console.log({ teto: stageRef.current.toDataURL() })

    const ctx = canvas.current.getContext('2d')

    const background = new Image()
    background.src = selfie
    background.crossOrigin = 'anonymous'

    const nft = nftImg.current
    nft.crossOrigin = 'anonymous'

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = () => {
      ctx.drawImage(background, 0, 0)
      ctx.drawImage(nft, x, y, 80, 80)
    }

    // nft.onload = function () {
    //   ctx.drawImage(background, 0, 0)
    //   ctx.drawImage(nft, x, y)
    // }
  }

  const onclickPape = () => {
    console.log('entramos maeee')
    downloadURI({ x: star.x, y: star.y })

    const link = document.createElement('a')
    link.download = 'test-teto'
    link.href = canvas.current.toDataURL()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    console.log('done', nftUrl, dataUrl, setDataUrl)
  }, [])

  return (
    <>
      <img src={nftUrl} style={{ display: 'none' }} ref={nftImg} />
      <button onClick={onclickPape}>Save Image</button>
      <canvas
        ref={canvas}
        width={640}
        height={480}
        style={{ display: 'none' }}
      />
      <Stage
        width={640}
        height={480}
        ref={stageRef}
        style={{
          border: '1px solid red',
          backgroundImage: `url("${selfie}")`
        }}
      >
        <Layer>
          <Star
            id={star.id}
            x={star.x}
            y={star.y}
            // image="https://konvajs.org/assets/yoda.jpg"
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            scaleX={star.isDragging ? 1.2 : 1}
            scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </Layer>
      </Stage>
    </>
  )
}

Test.propTypes = {
  selfie: PropTypes.string,
  nftUrl: PropTypes.string
}

export default Test
