```jsx
import React, { useState } from 'react';
import Button from '../Button';
import Checkbox from '../../form/components/Checkbox';

const Example = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBigModal, setShowBigModal] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [theme, setTheme] = useState('success');
  const themeOptions = ['default', 'info', 'success', 'warning', 'danger'];

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
        <Checkbox
          label="Show backdrop"
          value={showBackdrop}
          onChange={e => setShowBackdrop(e.target.checked)}
        />
      </div>

      <Button onClick={() => setShowModal(true)} theme="primary">
        Open Modal
      </Button>

      <Modal
        className="custom-modal-class"
        theme={theme}
        opened={showModal}
        showBackdrop={showBackdrop}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Save your changes before leaving?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to leave this page, any changes that haven't been saved will be lost.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button theme="secondary-link" onClick={() => setShowModal(false)}>Close</Button>
          <Button theme="secondary-outline" onClick={() => setShowModal(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Button onClick={() => setShowBigModal(true)} theme="primary">
        Open Long Modal
      </Button>

      <Modal
        className="custom-modal-class"
        theme={theme}
        opened={showBigModal}
        showBackdrop={showBackdrop}
        onClose={() => setShowBigModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Save your changes before leaving?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Aliquet curabitur at in, <a href="/#/Components/Modal">nascetur suspendisse</a> laoreet egestas. Montes vestibulum urna elementum; tempor congue netus suscipit. Molestie feugiat augue dictum urna arcu diam tellus. Eu nam nullam; feugiat dapibus aliquet imperdiet. Congue maecenas tellus aliquam elementum dolor per. Dictum nibh eget curae nunc tempus leo augue. Phasellus conubia lorem; taciti nostra parturient nunc?
          </p>
          <br />
          <p>
            Mollis cursus curabitur quis, integer mattis vehicula eros. Auctor vitae proin malesuada facilisis egestas hac. Fusce viverra hac purus mus accumsan per urna mus. Venenatis sapien pretium volutpat rhoncus nisl aliquam sollicitudin. Dictum habitant tortor maximus, magnis sollicitudin dictum? Nisl turpis nisl elit erat taciti class suspendisse nostra. Porttitor interdum lobortis donec nec dui lacus aenean. Varius elementum inceptos, volutpat ornare leo dis class purus nibh.
          </p>
          <br />
          <p>
            Cubilia litora posuere proin orci cubilia nascetur hendrerit. Turpis sodales porttitor lectus quam aliquam efficitur nam dis? At lacinia dis venenatis lacinia senectus amet leo litora. Ad vehicula cursus eu et lobortis hendrerit. Morbi placerat vitae platea dictum pharetra egestas. Platea lobortis in dapibus feugiat libero ad. Ad interdum justo libero consequat sit faucibus curae nulla elementum. Habitasse fringilla placerat enim nec; natoque etiam.
          </p>
          <br />
          <p>
            Cursus dis viverra vulputate primis pulvinar. Nullam ut vehicula consequat tempus luctus. Quis dolor vestibulum vel per feugiat mus quisque. Elit tristique eu porttitor; eleifend varius leo pharetra luctus. Nisl ridiculus magna tortor nostra sapien blandit auctor molestie. Vitae platea aenean natoque torquent metus feugiat dictum? Per curae condimentum proin scelerisque urna conubia. Facilisis euismod sociosqu non faucibus felis faucibus, pellentesque velit mus.
          </p>
          <br />
          <p>
            Pellentesque nibh habitasse in facilisi dolor mi iaculis habitasse. Sociosqu aptent vestibulum mi metus odio. Mus metus sed nisl ad fusce quis dapibus curae eleifend? Odio litora torquent, tempor adipiscing maximus quam massa habitasse. Commodo augue semper sapien fringilla fermentum habitant sociosqu. Fringilla nec mauris felis tortor eget mollis. Litora eros lobortis penatibus sagittis elit eros nibh erat efficitur!
          </p>
          <br />
          <p>
            Mollis cursus curabitur quis, integer mattis vehicula eros. Auctor vitae proin malesuada facilisis egestas hac. Fusce viverra hac purus mus accumsan per urna mus. Venenatis sapien pretium volutpat rhoncus nisl aliquam sollicitudin. Dictum habitant tortor maximus, magnis sollicitudin dictum? Nisl turpis nisl elit erat taciti class suspendisse nostra. Porttitor interdum lobortis donec nec dui lacus aenean. Varius elementum inceptos, volutpat ornare leo dis class purus nibh.
          </p>
          <br />
          <p>
            Cubilia litora posuere proin orci cubilia nascetur hendrerit. Turpis sodales porttitor lectus quam aliquam efficitur nam dis? At lacinia dis venenatis lacinia senectus amet leo litora. Ad vehicula cursus eu et lobortis hendrerit. Morbi placerat vitae platea dictum pharetra egestas. Platea lobortis in dapibus feugiat libero ad. Ad interdum justo libero consequat sit faucibus curae nulla elementum. Habitasse fringilla placerat enim nec; natoque etiam.
          </p>
          <br />
          <p>
            Cursus dis viverra vulputate primis pulvinar. Nullam ut vehicula consequat tempus luctus. Quis dolor vestibulum vel per feugiat mus quisque. Elit tristique eu porttitor; eleifend varius leo pharetra luctus. Nisl ridiculus magna tortor nostra sapien blandit auctor molestie. Vitae platea aenean natoque torquent metus feugiat dictum? Per curae condimentum proin scelerisque urna conubia. Facilisis euismod sociosqu non faucibus felis faucibus, pellentesque velit mus.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button theme="secondary-link" onClick={() => setShowBigModal(false)}>Close</Button>
          <Button theme="secondary-outline" onClick={() => setShowBigModal(false)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
<Example />
```
