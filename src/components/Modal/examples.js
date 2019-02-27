import React, { Component, Fragment } from 'react';

import { Modal } from './index';
import Button from '../Button';

export default class ModalExample extends Component {
  state = {
    smallModalOpened: false,
    largeModalOpened: false,
  };

  closeModal(param) {
    this.setState((prevState) => {
      prevState[param] = false;

      return prevState;
    });
  }

  openModal(param) {
    this.setState((prevState) => {
      prevState[param] = true;

      return prevState;
    });
  }

  render() {
    const {
      smallModalOpened,
      largeModalOpened,
    } = this.state;

    return (
      <Fragment>
        <Button onClick={this.openModal.bind(this, 'smallModalOpened')} theme="primary">Small Modal</Button>
        <Button onClick={this.openModal.bind(this, 'largeModalOpened')} theme="primary">Large Modal</Button>

        <Modal
          opened={smallModalOpened}
          onClose={this.closeModal.bind(this, 'smallModalOpened')}
        >
          <Modal.Header>
            <Modal.Title>
              Modal example
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Small Modal body content
          </Modal.Body>
          <Modal.Footer>
            <Button theme="success">
              Save
            </Button>
            <Button theme="default">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          opened={largeModalOpened}
          onClose={this.closeModal.bind(this, 'largeModalOpened')}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>
              Modal example
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Large Modal body content
          </Modal.Body>
          <Modal.Footer>
            <Button theme="success">
              Save
            </Button>
            <Button theme="default">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}
