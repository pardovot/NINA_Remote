// counter.store.js
import React from 'react';
import { makeObservable, action, observable, runInAction } from 'mobx';
import ReconnectingWebSocket from 'react-native-reconnecting-websocket';
import { Alert } from 'react-native';

type Body = {
  Device: string;
  Action: string;
};

type TelescopeSettings = Partial<{
  Id: string;
  Name: string;
  FocalLength: string;
  FocalRatio: string;
  SnapPortStart: string;
  SnapPortStop: string;
  SettleTime: number;
  NoSync: boolean;
  PrimaryReversed: boolean;
  SecondaryReversed: boolean;
}>;

class GlobalStore {
  client = null;
  ip = '192.168.1.5';
  isSocketConnected = false;
  event = 'init';
  base64Image = undefined;
  activeProfile: { [key: string]: any } = {};
  isTabHidden = false;
  cameraSettings: CameraSettings = {};
  telescopeSettings: TelescopeSettings = {};
  focuserSettings: FocuserSettings = {};
  autoRefreshImage = true;

  constructor() {
    makeObservable(this, {
      ip: observable,
      client: observable,
      isSocketConnected: observable,
      event: observable,
      base64Image: observable,
      activeProfile: observable,
      isTabHidden: observable,
      cameraSettings: observable,
      telescopeSettings: observable,
      focuserSettings: observable,
      autoRefreshImage: observable,
      setIP: action.bound,
      setEvent: action.bound,
      setIsSocketConnected: action.bound,
      initializeWebsocket: action.bound,
      setBase64Image: action.bound,
      setActiveProfile: action.bound,
      killWebsocket: action.bound,
      // setTelescopeProperty: action.bound,
      handleScreenTabClick: action.bound,
      setAutoRefreshImage: action.bound,
      fetchLastImage: action.bound,
      fetchPost: action.bound,
      fetchData: action.bound,
    });
  }

  setTelescopeSettings(telescopeSettings) {
    this.telescopeSettings = telescopeSettings;
  }

  setCameraSettings(cameraSettings) {
    this.cameraSettings = cameraSettings;
  }

  setFocuserSettings(focuserSettings) {
    this.focuserSettings = focuserSettings;
  }

  setActiveProfile(activeProfile: { [key: string]: string }) {
    this.activeProfile = activeProfile;
    this.setTelescopeSettings(this.activeProfile.TelescopeSettings);
    this.setCameraSettings(this.activeProfile.CameraSettings);
    this.setFocuserSettings(this.activeProfile.FocuserSettings);
  }

  setProfileEquipmentProperty = async (identifier: string, newValue: string | boolean) => {
    try {
      const body = {
        Device: 'change-value',
        Action: identifier,
        Parameter: [newValue],
      };
      const { response } = await this.fetchPost('profile', body);
      const { json } = await this.fetchData('profile?property=active');
      this.setActiveProfile(json.Response);
      return { response, json };
    } catch (error) {
      console.log(error);
    }
  };

  setBase64Image(base64URL: string) {
    this.createBase64URL(base64URL);
  }

  createBase64URL(base64URL) {
    this.base64Image = `data:image/png;base64,${base64URL}`;
  }

  setIP(newIP) {
    this.ip = newIP;
    if (this.client) {
      this.client.url = `ws://${this.ip}:1888/socket`;
    }
  }

  setIsSocketConnected(isSocketConnected: boolean) {
    this.isSocketConnected = isSocketConnected;
  }

  setEvent(newEvent) {
    this.event = newEvent;
  }

  setIsTabHidden() {
    this.isTabHidden = !this.isTabHidden;
  }

  setAutoRefreshImage(newValue) {
    this.autoRefreshImage = newValue;
  }

  handleScreenTabClick() {
    this.setIsTabHidden();
  }

  initializeWebsocket = async () => {
    const reg = /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|(?=$))){4}$/;
    if (reg.test(this.ip) && !this.isSocketConnected && this.client == null) {
      console.log('init');
      this.client = new ReconnectingWebSocket(`ws://${this.ip}:1888/socket`, null, { reconnectInterval: 3000 });

      this.client.onopen = async (e) => {
        console.log('onopen', e);
        this.setIsSocketConnected(true);
      };

      this.client.onmessage = async (evt) => {
        console.log('onmessage', JSON.parse(evt.data));
        this.setEvent(JSON.parse(evt.data));
        const message = JSON.parse(evt.data).Response;
        console.log(message);
        switch (message) {
          case 'IMAGE-NEW':
            if (this.autoRefreshImage) await this.fetchLastImage();
            break;
          default:
            break;
        }
      };

      this.client.onclose = (e) => {
        console.log('onclose', e);
        this.setIsSocketConnected(false);
        if (e.reason == 'terminate') {
          this.killWebsocket();
        }
      };

      this.client.onerror = (e) => {
        console.log('onerror', e);
        this.setIsSocketConnected(false);
        if (e.message) {
          this.killWebsocket();
          Alert.alert('Error', "Couldn't connect to NINA, please make sure the server is ON and that the IP is correct.", null);
        }
      };
    }
  };

  killWebsocket() {
    this.client.onopen = null;
    this.client.onmessage = null;
    this.client.onerror = null;
    this.client.onclose = null;
    this.client = null;
  }

  fetchLastImage = async (scale: number = 100) => {
    const response = await this.fetchData(`equipment?property=image&parameter=${scale}`);
    if (!response) {
      console.log('response is null');
      return;
    }
    const { json } = response;
    if (json?.Response != 'No Images Available') {
      const image = json.Response;
      this.setBase64Image(image);
    }
  };

  fetchData = async (endpoint) => {
    try {
      const fetchURL = `http://${this.ip}:1888/api/${endpoint}`;
      const response = await fetch(fetchURL);
      const json = await response.json();
      // if (response.status != 200) throw new Error("Invalid status code");
      return { response, json };
    } catch (error) {
    }
  };

  fetchPost = async (endpoint: string, body: Body) => {
    try {
      const fetchURL = `http://${this.ip}:1888/api/${endpoint}`;
      const response = await fetch(fetchURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response) return;
      const json = await response.json();
      return { response, json };
    } catch (error) {
      console.log(error);
    }
  };
}

// Instantiate the counter store.
export const globalStore = new GlobalStore();
// Create a React Context with the counter store instance.
export const globalStoreContext = React.createContext(globalStore);
export const useGlobalStore = () => React.useContext(globalStoreContext);
