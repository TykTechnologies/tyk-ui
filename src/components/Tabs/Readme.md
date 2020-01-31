```js
import {useState} from 'react';
import Button from '../Button';

const [showTab, setShowTab] = useState(true);
const [displayTab3, setDisplayTab3] = useState(true);
<>
<Button
  theme="default"
  onClick={() => setDisplayTab3(!displayTab3)}
>
  Toggle Tab 3 display
</Button>
<Tabs
  id="group-tabs-1"
  selected="tab-1"
>
  {
    ({
      hideTab,
      showTab
    }) => (
      <>
      <Button
        onClick={() => {hideTab('tab-2');}}
        theme="default"
      >
        hide
      </Button>
      <Button
        onClick={() => {showTab('tab-2');}}
        theme="default"
      >
        show
      </Button>
      <Tabs.Tab
          id="tab-1"
          title="Tab 1"
          selected={ true }
        >
          <Tabs
            id="group-tabs-1.1"
            selected="tab-1.0"
          >
            <Tabs.Tab
              id="tab-1.1"
              title="Tab 1.1"
              selected={ true }
            >
              Tab 1.1
            </Tabs.Tab>
            <Tabs.Tab
              id="tab-1.2"
              title="Tab 1.2"
            >
              Tab 1.2
            </Tabs.Tab>
          </Tabs>
        </Tabs.Tab>
        {displayTab3 && (
          <Tabs.Tab
            id="tab-3"
            title="Tab 3"
          >
            Tab 3
          </Tabs.Tab>
        )}
        {
          showTab
          ? (
            <Tabs.Tab
              id="tab-2"
              title="Tab 2"
            >
              Tab 2
            </Tabs.Tab>
          )
          : null
        }
        <Tabs.Tab
          id="tab-4"
          title="Tab 4"
        >
          Tab 4
        </Tabs.Tab>
        <Tabs.Tab
          id="tab-5"
          title="Tab 5"
        >
          Tab 5
        </Tabs.Tab>
        <Tabs.Tab
          id="tab-6"
          title="Tab 6"
        >
          Tab 6
        </Tabs.Tab>
        <Tabs.Tab
          id="tab-7"
          title="Tab 7"
        >
          Tab 7
        </Tabs.Tab>
      </>
    )
  }
</Tabs>
</>
```
