import React, { useState, useEffect, lazy, Suspense } from 'react';
import styled from 'styled-components';

const StyledComponent = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: auto;
  min-width: 350px;
  display: contents;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ComponentSelectorContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const ComponentSelectorTitle = styled.h1`
  color: #333;
`;

const CustomSelectContainer = styled.div`
  position: relative;
  margin-top: 8px;
`;

const CustomSelect = styled.div`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const CustomOptions = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
`;

const CustomOption = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ComponentSelector = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  // Event handler for select change
  const handleSelectChange = async (value) => {
    try {
      let component;

      // If the same option is selected again, reset the state
      if (value === selectedValue) {
        setSelectedValue('');
        setSelectedComponent(null);
        setIsOpen(false);
        return;
      }

      switch (value) {
        case 'Get-Request':
          component = await import('../GetRequest/GetRequest');
          break;
        case 'Post-Request':
          component = await import('../PostRequest/PostRequest');
          break;
        case 'Update-Request':
          component = await import('../UpdateRequest/UpdateRequest');
          break;
        case 'Delete-Request':
          component = await import('../DeleteRequest/DeleteRequest');
          break;
        case 'Playground':
          component = await import('../Playground/Playground');
          break;
        case 'Login':
          component = await import('../Authentication/Login/Login');
          break;
        case 'Register':
          component = await import('../Authentication/Register/Register');
          break;
        default:
          // Default case: User hasn't selected a valid option
          setSelectedValue('');
          setSelectedComponent(null);
          setIsOpen(false);
          break;
      }

      setSelectedValue(value);
      setSelectedComponent(component);
      setIsOpen(false);
    } catch (error) {
      console.error('Error loading component:', error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ComponentSelectorContainer>
      <ComponentSelectorTitle>Select a Card</ComponentSelectorTitle>

      {/* Custom dropdown for mobile */}
      <CustomSelectContainer style={{ background: "#fafafa" }}>
        <CustomSelect onClick={toggleDropdown}>
          {selectedValue ? `Selected: ${selectedValue}` : 'Select a component'}
        </CustomSelect>
        <CustomOptions style={{ zIndex: "5" }} isOpen={isOpen}>
          <CustomOption onClick={() => handleSelectChange('Get-Request')}>GetRequest</CustomOption>
          <CustomOption onClick={() => handleSelectChange('Post-Request')}>PostRequest</CustomOption>
          <CustomOption onClick={() => handleSelectChange('Update-Request')}>UpdateRequest</CustomOption>
          <CustomOption onClick={() => handleSelectChange('Delete-Request')}>DeleteRequest</CustomOption>
          <CustomOption onClick={() => handleSelectChange('Playground')}>Playground</CustomOption>
          <CustomOption onClick={() => handleSelectChange('Login')}>Login</CustomOption>
          <CustomOption onClick={() => handleSelectChange('Register')}>Register</CustomOption>
        </CustomOptions>
      </CustomSelectContainer>

      {/* Render selected component or default message */}
      {selectedComponent ? (
        <div style={{ marginTop: '' }}>
          <Suspense fallback={<div>Loading...</div>}>
            {typeof selectedComponent === 'function' ? (
              selectedComponent()
            ) : (
              <StyledComponent>{React.createElement(selectedComponent.default)}</StyledComponent>
            )}
          </Suspense>
        </div>
      ) : (
        <p style={{ marginTop: '', color: '#333' }}>Please select a request component.</p>
      )}
    </ComponentSelectorContainer>
  );
};

export default ComponentSelector;
