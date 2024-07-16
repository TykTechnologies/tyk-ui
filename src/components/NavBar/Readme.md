```js
import Tooltip from '../Tooltip';
import Tabs from '../Tabs';
import Button from '../Button';
import Icon from '../Icon';
<div style={{
  backgroundColor: "#EDEDF9"
}}>
<br />
<br />
<NavBar
  title="Prct"
  left={
    <Tooltip
      render="prct"
      position="bottom"
    >
      <Icon type="circle-question" weight="solid"/>
    </Tooltip>
  }
  right={
    <>
      <Button
        theme="danger-outline"
        type="button"
      >
        Delete
      </Button>
      <Button
        theme="primary"
      >
        Update
      </Button>
    </>
  }
/>
<br />
<br />
<NavBar
  pre={
    <a href=""> &lt; Back to something</a>
  }
  title="Prct"
  left={
    <Tooltip
      render="prct"
      position="bottom"
    >
      <Icon type="circle-question" weight="solid"/>
    </Tooltip>
  }
  right={
    <>
      <Button
        theme="danger-outline"
        type="button"
      >
        Delete
      </Button>
      <Button
        theme="primary"
      >
        Update
      </Button>
    </>
  }
/>
<br />
<br />
<NavBar
  pre={
    <a href=""> &lt; Back to something</a>
  }
  withTabs
  title="Prct"
  left={
    <Tooltip
      render="prct"
      position="bottom"
    >
      <Icon type="circle-question" weight="solid"/>
    </Tooltip>
  }
  
  right={
    <>
      <Button
        theme="danger-outline"
        type="button"
      >
        Delete
      </Button>
      <Button
        theme="primary"
      >
        Update
      </Button>
    </>
  }
>
  <Tabs
    hideTabContent
  >
    <Tabs.Tab
      id="accessRights"
      title="Access Rights"
      selected={true}
    />
    <Tabs.Tab
      id="overview"
      title="Overview"
    />
  </Tabs>
</NavBar>
<br />
<br />
<NavBar
  pre={
    <a href=""> &lt; Back to something</a>
  }
  withTabs
  title="Prct"
  subtitle="Policy ID: 123123123123"
  
  right={
    <>
      <Button
        theme="danger-outline"
        type="button"
      >
        Delete
      </Button>
      <Button
        theme="primary"
      >
        Update
      </Button>
    </>
  }
>
  <Tabs
    hideTabContent
  >
    <Tabs.Tab
      id="accessRights"
      title="Access Rights"
      selected={true}
    />
    <Tabs.Tab
      id="overview"
      title="Overview"
    />
  </Tabs>
</NavBar>
<br />
<br />
</div>
```
