import eventDispatcher from '../eventDispatcher';
import { renderCompleteEvent } from '../../constants/domEvents';

describe(eventDispatcher, () => {
  let eventListener: any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    eventListener = jest.fn();
    document.addEventListener(renderCompleteEvent.name, eventListener);
  });

  it('should dispatch events', done => {
    // Act
    eventDispatcher(renderCompleteEvent);

    // Assert
    setTimeout(() => {
      expect(eventListener).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: renderCompleteEvent.detail,
        })
      );
      done();
    });
  });
});
