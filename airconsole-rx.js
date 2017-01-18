(function() {
  if (!AirConsole || (typeof AirConsole !== 'function')) {
    throw new Error('AirConsole not found!');
  }
  if (!Rx || (typeof Rx !== 'object')) {
    throw new Error('RxJS not found!');
  }

  function AirConsoleRx(airconsoleInstance) {
    this.airconsole = airconsoleInstance;

    _init(this);
  }

  /**
   * All events that are to be wrapped. The key is the name of the event.
   * The value is a mapper function for events with more than one argument.
   */
  var eventConfigs = {
    onReady: null,
    onConnect: null,
    onDisconnect: null,
    onMessage: function(device_id, data) {
      return { device_id: device_id, data: data };
    },
    onCustomDeviceStateChange: function(device_id, custom_data) {
      return { device_id: device_id, custom_data: custom_data };
    },
    onDeviceStateChange: function(device_id, device_data) {
      return { device_id: device_id, device_data: device_data };
    },
    onDeviceProfileChange: null,
    onEmailAddress: null,
    onActivePlayersChange: null,
    onDeviceMotion: null,
    onAdShow: null,
    onAdComplete: null,
    onPremium: null,
    onPersistentDataStored: null,
    onHighScoreStored: null,
    onHighScores: null,
  };

  function _init(self) {
    for (var eventName in eventConfigs) {
      _initEventObservable(self, eventName, eventConfigs[eventName]);
    }
  };

  function _initEventObservable(self, eventName, selectorFn) {
    self[eventName] = Rx.Observable.fromEventPattern(function(handler) {
      self.airconsole[eventName] = handler;
    }, null, selectorFn);
  }

  window.AirConsoleRx = AirConsoleRx;
})();
