import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {fabric} from 'fabric';
import map from 'lodash/map';

const fabricCanvas = new fabric.Canvas();

const Fabric = React.createClass({
  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);

    fabricCanvas.initialize(el, {
      height: 450,
      width: 450,
    });

    fabricCanvas.renderAll();
  },

  componentWillUnmount() {
    fabricCanvas.dispose();
  },

  render() {
    return (
      <canvas id="canvas"></canvas>
    )
  }
});

class Template extends React.Component {
  constructor(props) {
    super(props);
    
    this.attachImage = this.attachImage.bind(this);
    this.attachAlbum = this.attachAlbum.bind(this);
    this.attachArtist = this.attachArtist.bind(this);
  }

  componentDidMount() {
    this.attachImage('third');
    this.attachArtist();
    this.attachAlbum();
  }

  attachImage(targetId) {
    if (fabricCanvas.item(0)) {
      fabricCanvas.item(0).remove();
    }

    let img = new fabric.Image(document.getElementById(targetId), {
      width: 450,
      height: 450,
      selection: false,
      selectable: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      async: true
    });

    fabricCanvas.add(img);
    fabricCanvas.sendToBack(img);
  }

  attachArtist() {
    let artistText = new fabric.Text(this.props.artistName, {
      fontFamily: 'Helvetica',
      fontSize: 28,
      fill: '#4d394b',
      top: 15,
      fontWeight: 600
    });

    fabricCanvas.add(artistText);
    fabricCanvas.bringForward(artistText);
  }

  attachAlbum() {
    let albumText = new fabric.Text(this.props.albumName, {
      fontFamily: 'Helvetica',
      fontStyle: 'italic',
      fontSize: 18,
      top: 45,
      left: 15,
      fill: '#4d394b'
    });

    fabricCanvas.add(albumText);
    fabricCanvas.bringForward(albumText);
  }

  render() {
    const imagesList = {
      "first": 'http://40.media.tumblr.com/fdea16235b2e0280221c0e1a38cda91e/tumblr_neuhzgqlDF1s0dk2do3_500.png',
      "second": 'https://photos.smugmug.com/Minimalism/i-bVwjCK8/0/M/GoldieKyle_GrandImage_Horizon-4040-1-M.jpg',
      "third": 'http://www.nicholasbellphotography.com/img/s4/v11/p1782784231-3.jpg',
      "fourth": 'http://st2.depositphotos.com/4376739/11316/v/450/depositphotos_113162174-Geometric-graphic-background-molecule-and.jpg'
    }

    const images = map(imagesList, (val, key) =>
      <img src={val} key={key} id={key} width={45} height={45} onClick={() => this.attachImage(key)} />
    );

    return (
      <div id="test">
        {images}
      </div>
    )
  }
}


class CustomArtwork extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: 'Linkin Park',
      albumName: 'Somewhere I Belong'
    }

    this.handleChange = this.handleChange.bind(this);
    this.saveImg = this.saveImg.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

    if (e.target.name == 'artistName') {
      fabricCanvas.item(1).text = e.target.value;
    } else if (e.target.name == 'albumName') {
      fabricCanvas.item(2).text = e.target.value;
    }

    fabricCanvas.renderAll();

    console.log(e.target);
  }

  saveImg() {
    const Canvas = document.getElementById('canvas');
    const Img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    window.location.href = Img;
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div>
          <input type="text" name="artistName" onChange={this.handleChange} value={this.state.artistName} />
          <input type="text" name="albumName" onChange={this.handleChange} value={this.state.albumName} />
          <Fabric />
        </div>
        <div style={{marginLeft: 40}}>
          <Template albumName={this.state.albumName} artistName={this.state.artistName} isChanged={this.handleChange}/>
          <button onClick={this.saveImg}>Save</button>
        </div>
      </div>
    );
  }
};

export default CustomArtwork;