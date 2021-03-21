

export default function Image () {
  return <div className="image-container">
    <img src='/imgs/google_logo.svg' alt="logo" />

    <style jsx>{`
      .image-container {
        display: flex;
        justify-content: center;
        padding-bottom: 40px;
      }
      img {
        width: 272px;
        height: 92px;
      }
    `}</style>
  </div>
}




