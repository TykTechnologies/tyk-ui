```jsx
import React, { useState } from 'react';
import Button from '../Button';

const Example = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeprecated, setShowDeprecated] = useState(false);
  const [theme, setTheme] = useState('warning');
  const themeOptions = ['warning', 'danger', 'none'];
  return (
    <>
      <div>
        <div>Modal Theme:</div>
        {themeOptions.map(t => (
          <label key={t}>
            <input type="radio" name="modalTheme" value={t} checked={theme === t} onChange={e => setTheme(e.target.value)} />
            <span>{t}</span>
          </label>
        ))}
      </div>
      <div>
        <label>
          <input type="checkbox" checked={showDeprecated} onChange={e => setShowDeprecated(e.target.checked)} />
          <span>Show with deprecated <strong>Modal.Header</strong> and <strong>Modal.Title</strong>.</span>
        </label>
      </div>
      <Button onClick={() => setShowModal(true)} theme="success">
        Open Modal
      </Button>
      <Modal className="custom-modal-class" opened={showModal} onClose={() => setShowModal(false)} theme={theme}>
        {showDeprecated && (
          <Modal.Header>
            <Modal.Title>Save your changes before leaving?</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          {!showDeprecated && (
            <h4>Save your changes before leaving?</h4>
          )}
          <p>You are about to leave this page, any changes that haven't been saved will be lost.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button theme="primary-outline" onClick={() => setShowModal(false)}>Close</Button>
          <Button theme="success" onClick={() => setShowModal(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
<Example />
```
