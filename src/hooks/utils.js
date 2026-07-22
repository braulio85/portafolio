/**
 * @author Braulio Echeverría
 * @date 2025-05-10
 * @description This file contains a collection of utility functions that can be used throughout the application.
 */
import { _arrayUtils } from './utils/_array-utils.js'
import { _capabilitiesUtils } from './utils/_capabilities-utils.js'
import { _cssUtils } from './utils/_css-utils.js'
import { _dateUtils } from './utils/_date-utils.js'
import { _deviceUtils } from './utils/_device-utils.js'
import { _domUtils } from './utils/_dom-utils.js'
import { _fileUtils } from './utils/_file-utils.js'
import { _jsonUtils } from './utils/_json-utils.js'
import { _loggingUtils } from './utils/_logging-utils.js'
import { _numberUtils } from './utils/_number-utils.js'
import { _storageUtils } from './utils/_storage-utils.js'
import { _stringUtils } from './utils/_string-utils.js'
import { _urlUtils } from './utils/_url-utils.js'
import { _validationUtils } from './utils/_validation-utils.js'

export const Utils = {
    array: _arrayUtils,
    capabilities: _capabilitiesUtils,
    css: _cssUtils,
    date: _dateUtils,
    device: _deviceUtils,
    dom: _domUtils,
    file: _fileUtils,
    json: _jsonUtils,
    log: _loggingUtils,
    number: _numberUtils,
    storage: _storageUtils,
    string: _stringUtils,
    url: _urlUtils,
    validation: _validationUtils,
}

// Hook para usar Utils de forma consistente con el resto del proyecto
export function useUtils() {
    return Utils
}
