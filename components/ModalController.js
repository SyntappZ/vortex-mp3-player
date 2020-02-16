import React, {Component} from 'react';
import {Modal} from 'react-native';

export default class ModalController extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentDidMount() {
    const {modalOpen} = this.props;

    this.setModalVisible(modalOpen);
  }

  render() {
    const {modalOpen, modalHandler, content} = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => {
          modalHandler();
        }}>
        {content}
      </Modal>
    );
  }
}
