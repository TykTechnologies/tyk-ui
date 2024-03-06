import { useRef } from 'react';

/**
 * RevealPanelService is a class that manages the resizing of a panel element.
 * It provides methods to set the panel's height, hide and show it, and attach
 * event listeners for resizing.
 */
class RevealPanelService {
  #state = null; // Private state for mouse interactions.

  #panel = null; // The panel element to be resized.

  #gutter = null; // The gutter element used for resizing.

  #wrapper = null; // The wrapper element that contains the panel and gutter.

  #onHeightChangeCallbacks = []; // Callback function to be executed when the panel is resized.

  #onDragStartCallbacks = []; // Callback function to be executed when the panel is resized.

  #onDragEndCallbacks = []; // Callback function to be executed when the panel is resized.

  #dragStarted = false;

  /**
   * Sets a callback function to be executed when the panel is resized.
   * @param {function} callback - The callback function to be called on panel resize.
   */
  on(eventName, listener) {
    let list = null;
    if (eventName === 'onHeightChange') {
      list = this.#onHeightChangeCallbacks;
    } else if (eventName === 'onDragStart') {
      list = this.#onDragStartCallbacks;
    } else if (eventName === 'onDragEnd') {
      list = this.#onDragEndCallbacks;
    }

    if (list) {
      this.addListener(list, listener);
    }
  }

  off(eventName, listener) {
    let list = null;
    if (eventName === 'onHeightChange') {
      list = this.#onHeightChangeCallbacks;
    } else if (eventName === 'onDragStart') {
      list = this.#onDragStartCallbacks;
    } else if (eventName === 'onDragEnd') {
      list = this.#onDragEndCallbacks;
    }

    if (list) {
      this.removeListener(list, listener);
    }
  }

  /**
   * Sets the panel, gutter, and wrapper elements to be controlled by this class.
   * @param {HTMLElement} wrapper - The wrapper element containing the panel and gutter.
   * @param {HTMLElement} panel - The panel element to be resized.
   * @param {HTMLElement} gutter - The gutter element used for resizing.
   */
  setRefs(wrapper, panel, gutter) {
    if (this.#panel || this.#gutter || this.#wrapper) {
      this.unbindEvents();
    }
    this.#wrapper = wrapper;
    this.#panel = panel;
    this.#gutter = gutter;
    this.#state = null;
    this.bindEvents();
  }

  /**
   * Attaches event listeners for panel resizing.
   */
  bindEvents() {
    this.ensureRefs('bindEvents');
    this.#gutter.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  /**
   * Gets the current height of the panel.
   * @returns {number} - The height of the panel in pixels.
   */
  getHeight() {
    this.ensureRefs('getHeight');
    const size = this.#panel.getBoundingClientRect();
    return size.height;
  }

  /**
   * Handles the mouse down event, initiating the resizing process.
   * @param {MouseEvent} e - The mouse event object.
   */
  onMouseDown(e) {
    this.ensureRefs('onMouseDown');
    this.#state = {
      mouseDown: true,
      initialRect: this.#panel.getBoundingClientRect(),
      initialEvent: e,
    };
  }

  /**
   * Handles the mouse move event, adjusting the panel's height during resizing.
   * @param {MouseEvent} e - The mouse event object.
   */
  onMouseMove(e) {
    this.ensureRefs('onMouseMove');

    if (!this.#state) {
      return;
    }

    const isButtonDown = this.isPrimaryMouseButtonDown(e);
    if (!isButtonDown) {
      this.onMouseUp();
      return;
    }

    if (!this.#dragStarted) {
      this.#dragStarted = true;
      this.onDragStart.bind(this)();
    }

    const newY = this.#state.initialEvent.y - e.y;
    const finalHeight = Math.ceil(this.#state.initialRect.height + newY);
    this.setHeight(`${finalHeight}px`, 'mousemove');
  }

  // eslint-disable-next-line class-methods-use-this
  notifyListeners(list, value) {
    if (list && Array.isArray(list) && list.length) {
      list.forEach((fn) => {
        if (typeof fn === 'function') {
          fn(value);
        }
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addListener(list, listener) {
    if (list && Array.isArray(list) && typeof listener === 'function') {
      list.push(listener);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  removeListener(list, listener) {
    if (list && Array.isArray(list) && typeof listener === 'function' && list.length) {
      const index = list.indexOf(listener);

      if (index > -1) {
        list.splice(index, 1);
      }
    }
  }

  onDragEnd() {
    if (this.#dragStarted) {
      this.notifyListeners(this.#onDragEndCallbacks, this.getHeight());
    }
  }

  onDragStart() {
    this.notifyListeners(this.#onDragStartCallbacks, this.getHeight());
  }

  // eslint-disable-next-line class-methods-use-this
  isPrimaryMouseButtonDown(e) {
    const flags = e.buttons !== undefined ? e.buttons : e.which;
    // eslint-disable-next-line no-bitwise
    const isDown = flags === 1;
    return isDown;
  }

  /**
   * Resets the state after the mouse up event, ending the resizing process.
   */
  onMouseUp() {
    this.#state = null;
    this.onDragEnd.bind(this)();
    this.#dragStarted = false;
  }

  /**
   * Sets the height of the panel.
   * @param {string} height - The new height value as a CSS string (e.g., "100px").
   */
  setHeight(height) {
    let heightVal = height;
    this.ensureRefs('setHeight');

    if (typeof heightVal === 'number') {
      heightVal += 'px';
    }

    this.#panel.style.height = heightVal;

    this.notifyListeners(this.#onHeightChangeCallbacks, this.getHeight());
  }

  /**
   * Ensures that the required elements (wrapper, panel, and gutter) are set.
   * Throws an error if they are missing.
   */
  ensureRefs(reason) {
    if (!this.#panel || !this.#gutter || !this.#wrapper) {
      throw new Error(
        `${reason}: Wrapper, panel, and gutter elements are required. Use setRefs method first.`,
      );
    }
  }

  /**
   * Checks if the panel is hidden.
   * @returns {boolean} - True if the panel is hidden; false otherwise.
   */
  isHidden() {
    this.ensureRefs('isHidden');
    return this.#wrapper.style.visibility === 'hidden';
  }

  /**
   * Hides the panel by setting its visibility to "hidden".
   */
  hide() {
    this.ensureRefs('hide');
    this.#wrapper.style.visibility = 'hidden';
  }

  /**
   * Shows the panel by setting its visibility to "visible".
   */
  show() {
    this.ensureRefs('show');
    this.#wrapper.style.visibility = 'visible';
  }

  /**
   * Unbinds the event listeners added for resizing.
   */
  unbindEvents() {
    this.#onHeightChangeCallbacks = [];
    this.#onDragStartCallbacks = [];
    this.#onDragEndCallbacks = [];
    this.#gutter.removeEventListener('mousedown', this.onMouseDown.bind(this));
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  deinit() {
    this.unbindEvents();
  }
}

export const useRevealPanelService = () => {
  const revealPanelServiceRef = useRef(new RevealPanelService());
  return revealPanelServiceRef.current;
};
