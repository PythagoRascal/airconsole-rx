(function() {
  if (!AirConsole || (typeof AirConsole !== 'function')) {
    throw new Error('AirConsole not found!');
  }
  if (!Rx || (typeof Rx !== 'object')) {
    throw new Error('RxJS not found!');
  }

  function AirConsoleRx(airconsoleOptions) {
    this.airconsole = new AirConsole(airconsoleOptions);

    _init(this);
  }

  /**
   * All events that are to be wrapped. The key is the name of the event.
   * The value is a mapper function for events with more than one argument.
   */

  function getArgumentWrappingFn(keys) {

  }

  var eventConfig = {
    onReady: function(code) { return { code: code } },
    onConnect: function(deviceId) { return { deviceId: deviceId } },
    onDisconnect: function(deviceId) { return { deviceId: deviceId } },
    onMessage: function(deviceId, data) {
      return { deviceId: deviceId, data: data }
    },
    onCustomDeviceStateChange: function(deviceId, data) {
      return { deviceId: deviceId, customData: customData }
    },
    onDeviceStateChange: function(deviceId, data) {
      return { deviceId: deviceId, deviceData: deviceData }
    },
    onDeviceProfileChange: function(deviceId) { return { deviceId: deviceId } },
    onEmailAddress: function(emailAddress) { return { emailAddress: emailAddress } },
    onActivePlayersChange: function(playerNumber) { return { playerNumber: playerNumber } },
    onDeviceMotion: function(data) { return { data: data } },
    onAdShow: null,
    onAdComplete: function(adWasShown) { return { adWasShown: adWasShown } },
    onPremium: function(deviceId) { return { deviceId: deviceId } },
    onPersistentDataLoaded: function(data) { return { data: data } },
    onPersistentDataStored: function(uid) { return { uid: uid } },
    onHighScoreStored: function(highScore) { return { highScore: highScore } },
    onHighScores: function(highScores) { return { highScores: highScores } },
  };

  function _init(self) {
    for (var eventName in eventConfig) {
      _initEventObservable(self, eventName, eventConfig[eventName]);
    }
  };

  function _initEventObservable(self, eventName, selectorFn) {
    self[eventName] = Rx.Observable.fromEventPattern(function(handler) {
      self.airconsole[eventName] = handler;
    }, null, selectorFn);
  }

  window.AirConsoleRx = AirConsoleRx;
})();
