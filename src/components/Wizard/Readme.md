```js
import Button from '../Button';
import Icon from '../Icon';
import Collapsible from '../Collapsible';
import Panel from '../Panel';
import Accordion from '../Accordion';

<Wizard>
	<Wizard.Section sectionNo={1}>
    {
      (sectionProps) => {
      	const { currentSection, sectionNo, navigate, valid, setContentValidation } = sectionProps;
      	const checkIsValid = () => {
				  setContentValidation(true);
				}

        return (
          <>
		        <Collapsible
		          collapsed={currentSection !== sectionNo}
		        >
				      <div className="validation-container">
					      {
					        valid
					        ?
					          <Icon type="check-circle" />
					        :
					          <Icon type="exclamation-circle" />
					      }
						  </div>
							<Button theme="success" onClick={() => navigate('next', sectionNo)}>Next Navigate</Button>
							<Button theme="success" onClick={() => checkIsValid()} >Validate</Button>
		        </Collapsible>
          </>
        );
      }
    }
	</Wizard.Section>
	<Wizard.Section sectionNo={2}>
    {
      (sectionProps) => {
      	const { currentSection, sectionNo, navigate, valid } = sectionProps;

        return (
          <>
		        <Collapsible
		          collapsed={currentSection !== sectionNo}
		        >
	          	<div>2</div>
							<Button theme="success" onClick={() => navigate('previous',sectionNo)} >Previous</Button>
							<Button theme="success" onClick={() => navigate('next', sectionNo)}>Next</Button>
		        </Collapsible>
          </>
        );
      }
    }
	</Wizard.Section>
	<Wizard.Section sectionNo={3}>
    {
      (sectionProps) => {
      	const { currentSection, sectionNo, navigate, valid } = sectionProps;

        return (
          <>
		        <Collapsible
		          collapsed={currentSection !== sectionNo}
		        >
	          	<div>3</div>
							<Button theme="success" onClick={() => navigate('previous', sectionNo)}>Previous</Button>
							<Button theme="success" onClick={() => navigate('next', sectionNo)}>Next</Button>
		        </Collapsible>
          </>
        );
      }
    }
	</Wizard.Section>
	<Wizard.Section sectionNo={4}>
    {
      (sectionProps) => {
      	const { currentSection, sectionNo, navigate, valid, onPanelCollapse, setContentValidation } = sectionProps;
      	const checkIsValid = () => {
				  setContentValidation(true);
				}

        return (
          <>
				      <Panel
				        collapsibleIconPosition="left"
				        collapsable
				        collapsed={currentSection !== sectionNo}
				        theme="blank"
				        onToggleCollapse={() => {
				          onPanelCollapse(sectionNo);
				        }}
				      >
				        {
				          () => (
				            <>
				              <Panel.Header>
				                Header
				              </Panel.Header>
				              <Panel.Body>
													<Button
														theme="success"
														onClick={() => navigate('previous', sectionNo)}
														>
														Previous
													</Button>
													<Button
														theme="success"
														onClick={() => navigate('next', sectionNo)}
														>
														Next
													</Button>
				              </Panel.Body>
				            </>
				          )
				        }
				      </Panel>
          </>
        );
      }
    }
	</Wizard.Section>
	<Wizard.Section sectionNo={5}>
    {
      (sectionProps) => {
      	const { currentSection, sectionNo, navigate, valid, onPanelCollapse, setContentValidation } = sectionProps;
      	const checkIsValid = () => {
				  setContentValidation(true);
				}
        return (
          <>
				      <Panel
				        collapsibleIconPosition="left"
				        collapsable
				        collapsed={currentSection !== sectionNo}
				        theme="blank"
				        onToggleCollapse={() => {
				          onPanelCollapse(sectionNo);
				        }}
				      >
				        {
				          () => (
				            <>
				              <Panel.Header>
				                Header 5
				              </Panel.Header>
				              <Panel.Body>
													<Button
														theme="success"
														onClick={() => navigate('previous', sectionNo)}
														>
														Previous
													</Button>
				              </Panel.Body>
				            </>
				          )
				        }
				      </Panel>
          </>
        );
      }
    }
	</Wizard.Section>
</Wizard>
```