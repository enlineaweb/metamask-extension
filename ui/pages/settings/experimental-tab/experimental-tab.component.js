import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import I18nValue from '../../../components/ui/i18n-value';
import ToggleButton from '../../../components/ui/toggle-button';
import Dropdown from '../../../components/ui/dropdown';

import { THEME_TYPE } from './experimental-tab.constant';

/*eslint-disable prefer-destructuring*/
const DARK_MODE_V1 = process.env.DARK_MODE_V1;

export default class ExperimentalTab extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
  };

  static propTypes = {
    useTokenDetection: PropTypes.bool,
    setUseTokenDetection: PropTypes.func,
    useCollectibleDetection: PropTypes.bool,
    setUseCollectibleDetection: PropTypes.func,
    setOpenSeaEnabled: PropTypes.func,
    openSeaEnabled: PropTypes.func,
    theme: PropTypes.string,
    setTheme: PropTypes.func,
  };

  renderTokenDetectionToggle() {
    const { t } = this.context;
    const { useTokenDetection, setUseTokenDetection } = this.props;

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{t('useTokenDetection')}</span>
          <div className="settings-page__content-description">
            {t('useTokenDetectionDescription')}
          </div>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <ToggleButton
              value={useTokenDetection}
              onToggle={(value) => {
                this.context.metricsEvent({
                  eventOpts: {
                    category: 'Settings',
                    action: 'Token Detection',
                    name: 'Token Detection',
                  },
                });
                setUseTokenDetection(!value);
              }}
              offLabel={t('off')}
              onLabel={t('on')}
            />
          </div>
        </div>
      </div>
    );
  }

  renderCollectibleDetectionToggle() {
    if (!process.env.COLLECTIBLES_V1) {
      return null;
    }

    const { t } = this.context;
    const {
      useCollectibleDetection,
      setUseCollectibleDetection,
      openSeaEnabled,
    } = this.props;

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{t('useCollectibleDetection')}</span>
          <div className="settings-page__content-description">
            {t('useCollectibleDetectionDescription')}
          </div>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <ToggleButton
              disabled={!openSeaEnabled}
              value={useCollectibleDetection}
              onToggle={(value) => {
                this.context.metricsEvent({
                  eventOpts: {
                    category: 'Settings',
                    action: 'Collectible Detection',
                    name: 'Collectible Detection',
                  },
                });
                setUseCollectibleDetection(!value);
              }}
              offLabel={t('off')}
              onLabel={t('on')}
            />
          </div>
        </div>
      </div>
    );
  }

  renderOpenSeaEnabledToggle() {
    if (!process.env.COLLECTIBLES_V1) {
      return null;
    }
    const { t } = this.context;
    const { openSeaEnabled, setOpenSeaEnabled } = this.props;

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>{t('enableOpenSeaAPI')}</span>
          <div className="settings-page__content-description">
            {t('enableOpenSeaAPIDescription')}
          </div>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <ToggleButton
              value={openSeaEnabled}
              onToggle={(value) => {
                this.context.metricsEvent({
                  eventOpts: {
                    category: 'Settings',
                    action: 'Enabled/Disable OpenSea',
                    name: 'Enabled/Disable OpenSea',
                  },
                });
                setOpenSeaEnabled(!value);
              }}
              offLabel={t('off')}
              onLabel={t('on')}
            />
          </div>
        </div>
      </div>
    );
  }

  renderTheme() {
    if (!DARK_MODE_V1) {
      return null;
    }
    const { t } = this.context;
    const { theme, setTheme } = this.props;

    const themesOptions = [
      {
        name: t('defaultTheme'),
        value: THEME_TYPE.DEFAULT,
      },
      {
        name: t('darkTheme'),
        value: THEME_TYPE.DARK,
      },
    ];

    return (
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span>
            <I18nValue messageKey="theme" />
          </span>
          <div className="settings-page__content-description">
            <I18nValue
              messageKey="themeDescription"
              options={[
                Object.values(THEME_TYPE).filter((type) => type !== theme),
              ]}
            />
          </div>
        </div>
        <div className="settings-page__content-item">
          <div className="settings-page__content-item-col">
            <Dropdown
              id="select-theme"
              options={themesOptions}
              selectedOption={theme}
              onChange={async (newTheme) => setTheme(newTheme)}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="settings-page__body">
        {this.renderTokenDetectionToggle()}
        {this.renderOpenSeaEnabledToggle()}
        {this.renderCollectibleDetectionToggle()}
        {this.renderTheme()}
      </div>
    );
  }
}
