
*Card component*
```js
import { useState } from 'react';
import Button from '../Button';
import Icon from '../Icon';
import Pill from '../Pill';
import Column from '../../layout/Column';
import Row from '../../layout/Row';

const [isCardActive, setIsCardActive] = useState(false);

<Row>
  <Column size="sm-6 md-6 lg-6" className="bottom-buffer-large">
    <Card onSelect={() => {setIsCardActive(!isCardActive)}} selected={isCardActive}>
      <Card.Body>
        <Card.Title>Clickable Card title</Card.Title>
        <Card.SubTitle>Card subtitle</Card.SubTitle>
      </Card.Body>
    </Card>
  </Column>
  <Column size="sm-12" className="bottom-buffer-large">
  <Card>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.SubTitle>Card subtitle</Card.SubTitle>
        <Card.Summary maxLines="auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
        </Card.Summary>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header
        right={(
          <>
            <Pill theme="success-outline square" className="no-margin-bottom">GraphQL</Pill>
            <Pill theme="success-outline square" className="no-margin-bottom">OAS</Pill>
          </>
        )}
      >
        <>
        <Icon type="circle-check" weight="solid" className="text--success" />
        <span className="left-buffer-small">Is Active</span>
        </>
      </Card.Header>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.SubTitle>Card subtitle</Card.SubTitle>
        <Card.Summary maxLines="auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
        </Card.Summary>
      </Card.Body>
      <Card.Footer>
        <Button theme="secondary-outline rounded-corners" size="sm">Cancel</Button>
        <Button theme="secondary rounded-corners" size="sm">Submit</Button>
      </Card.Footer>
    </Card>
  </Column>
  <Column size="sm-12" className="bottom-buffer-large">
    <Card>
      <Card.Header
        right={(
          <>
            <Pill theme="secondary square" className="no-margin-bottom">GraphQL</Pill>
            <Pill theme="secondary square" className="no-margin-bottom">OAS</Pill>
          </>
        )}
      >
        <>
        <Icon type="circle-check" weight="solid" className="text--success" />
        <span className="left-buffer-small">Is Active</span>
        </>
      </Card.Header>
      <Card.Body>
        <Card.TitleGroup>
          <Card.Icon><Icon type="check" /></Card.Icon>
          <Card.Title>Card title</Card.Title>
          <Card.SubTitle>Card subtitle</Card.SubTitle>
        </Card.TitleGroup>
        <Card.Summary maxLines="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
        </Card.Summary>
      </Card.Body>
      <Card.Footer>
        <Button theme="secondary-outline rounded-corners" size="sm">Cancel</Button>
        <Button theme="secondary rounded-corners" size="sm">Submit</Button>
      </Card.Footer>
    </Card>
  </Column>
  <Column size="sm-6 md-6 lg-6" className="bottom-buffer-large">
    <Card>
      <Card.Header
        right={(
          <>
            <Pill theme="secondary square" className="no-margin-bottom">GraphQL</Pill>
            <Pill theme="secondary square" className="no-margin-bottom">OAS</Pill>
          </>
        )}
      >
        <>
        <Icon type="circle-check" weight="solid" className="text--success" />
        <span className="left-buffer-small">Is Active</span>
        </>
      </Card.Header>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.SubTitle>Card subtitle</Card.SubTitle>
        <Card.Summary maxLines="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
        </Card.Summary>
      </Card.Body>
      <Card.Footer>
        <Button theme="secondary-outline rounded-corners" size="sm">Cancel</Button>
        <Button theme="secondary rounded-corners" size="sm">Submit</Button>
      </Card.Footer>
    </Card>
  </Column>
  <Column size="sm-6 md-6 lg-6" className="bottom-buffer-large">
    <Card>
      <Card.Header
        right={(
          <>
            <Pill theme="secondary square" className="no-margin-bottom">GraphQL</Pill>
            <Pill theme="secondary square" className="no-margin-bottom">OAS</Pill>
          </>
        )}
      >
        <>
        <Icon type="circle-check" weight="solid" className="text--success" />
        <span className="left-buffer-small">Is Active</span>
        </>
      </Card.Header>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.SubTitle>Card subtitle</Card.SubTitle>
        <Card.Summary maxLines="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
        </Card.Summary>
      </Card.Body>
      <Card.Footer>
        <Button theme="secondary-outline rounded-corners" size="sm">Cancel</Button>
        <Button theme="secondary rounded-corners" size="sm">Submit</Button>
      </Card.Footer>
    </Card>
  </Column>
  <Column size="sm-6 md-6 lg-6" className="bottom-buffer-large">
    <Card height={300}>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.SubTitle>Card subtitle</Card.SubTitle>
        <Card.Summary maxLines="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
        </Card.Summary>
      </Card.Body>
      <Card.Footer>
        <Button theme="secondary-outline rounded-corners" size="sm">Cancel</Button>
        <Button theme="secondary rounded-corners" size="sm">Submit</Button>
      </Card.Footer>
    </Card>
  </Column>
  <Column size="sm-6 md-6 lg-6" className="bottom-buffer-large">
    <Card height={300}>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.SubTitle>Card subtitle</Card.SubTitle>
        <Card.Summary maxLines="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
        </Card.Summary>
      </Card.Body>
    </Card>
  </Column>
  <Column size="sm-6 md-6 lg-6" className="bottom-buffer-large">
    <Card>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.SubTitle>Card subtitle</Card.SubTitle>
      </Card.Body>
    </Card>
  </Column>
  <Column size="sm-6 md-6 lg-6" className="bottom-buffer-large">
    <Card>
      <Card.Body>
        <Card.TitleGroup>
          <Card.Icon><Icon type="check" /></Card.Icon>
          <Card.Title>Card title</Card.Title>
          <Card.SubTitle>Card subtitle</Card.SubTitle>
        </Card.TitleGroup>
      </Card.Body>
    </Card>
  </Column>
  <Column size="sm-6 md-6 lg-6" className="bottom-buffer-large">
    <Card height={230}>
      <Card.Header
        right={(
          <>
            <Pill theme="success-outline square" className="no-margin-bottom">GraphQL</Pill>
            <Pill theme="success-outline square" className="no-margin-bottom">OAS</Pill>
          </>
        )}
      >
        <>
        <Icon type="circle-check" weight="solid" className="text--success" />
        <span className="left-buffer-small">Is Active</span>
        </>
      </Card.Header>
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.SubTitle>Card subtitle</Card.SubTitle>
        <Card.Summary maxLines="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
        </Card.Summary>
      </Card.Body>
      <Card.Footer>
        <Button theme="secondary-outline rounded-corners" size="sm">Cancel</Button>
        <Button theme="secondary rounded-corners" size="sm">Submit</Button>
      </Card.Footer>
    </Card>
  </Column>
  <Column size="sm-6 md-6 lg-6" className="bottom-buffer-large">
    <Card height={230}>
      <Card.Body align="center">
        <Card.TitleGroup>
          <Card.Icon><Icon type="plus" /></Card.Icon>
          <Card.Title>Card title</Card.Title>
          <Card.SubTitle>Card subtitle</Card.SubTitle>
        </Card.TitleGroup>
      </Card.Body>
      <Card.Footer>
        <Button theme="secondary-outline rounded-corners" size="sm">Cancel</Button>
        <Button theme="secondary rounded-corners" size="sm">Submit</Button>
      </Card.Footer>
    </Card>
  </Column>
</Row>
```
