import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Form } from 'react-bootstrap';

import { setLanguage } from '../../actions';
import { LANGUAGES } from '../../constants';
import { AppState } from '../../types';
import { getLanguageString } from '../../utils';

import i18n from 'i18next';

const languages = Object.values(LANGUAGES);

interface SelectLanguageProps {
  dispatch: Dispatch;
}
interface SelectLanguagePropsS {
  language?: string;
}

class SelectLanguage extends React.Component<
  SelectLanguageProps & SelectLanguagePropsS
> {
  setLanguageHandle = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.props.dispatch(setLanguage(e.currentTarget.value));

    if (e.currentTarget.value === 'en') {
      i18n.changeLanguage('en');
    } else if (e.currentTarget.value === 'be') {
      i18n.changeLanguage('be');
    } else if (e.currentTarget.value === 'ru') {
      i18n.changeLanguage('ru');
    }
  };

  render() {
    return (
      <Form>
        <Form.Control
          as="select"
          value={this.props.language}
          onChange={this.setLanguageHandle}
        >
          {languages.map((x, i) => {
            return (
              <option key={i} value={x}>
                {getLanguageString(x)}
              </option>
            );
          })}
        </Form.Control>
      </Form>
    );
  }
}

const mapStateToProps = (state: AppState): SelectLanguagePropsS => {
  return { language: state.settings.language };
};

export default connect(mapStateToProps)(SelectLanguage);
