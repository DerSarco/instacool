import * as React from 'react';
import Footer from './Footer'

const style = {
  backgroundColor: "#ddd",
  border: '1px solid #eee',
  padding: '10px 15px',
  marginBottom: '10px',
}

interface IPostProps {
  image: string,
  like: () => void,
  share: ()=> void,
}

export default class Post extends React.Component<IPostProps> {
  public render() {
    const { image, like, share } = this.props
    return (
      <div style={style}>
        <img style={{width: '300px'}} src={image} />
        <Footer like={like} share={share}/>
      </div>
    )
  }
} 