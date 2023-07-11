import styled from 'styled-components';
import { Layout } from 'antd';

interface ContainerProps {
  justifyContent?: string;
  alignItems?: string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
}

export const Container = styled(Layout)<ContainerProps>`
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'start')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'start')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : 0)};
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : 0)};
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : 0)};
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : 0)};
  padding-bottom: ${(props) => (props.paddingBottom ? props.paddingBottom : 0)};
  height: 100%;
  width: 100%;
`;
