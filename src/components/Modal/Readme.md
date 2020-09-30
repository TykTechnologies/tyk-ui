```jsx
import React, { useState } from "react";
import Button from "../Button";

const Example = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)} theme="success">
        Open Modal
      </Button>
      <Modal opened={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is modal body</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} theme="default">
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
<Example />
```
