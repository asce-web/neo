import * as xjs from 'extrajs-dom'

import {ConfPerson} from '../interfaces'
import person_contact_processor from '../tpl/person-contact.tpl'


/**
 * @deprecated
 */
export default class Person {
	/** All the data for this object. */
	private readonly _DATA: ConfPerson;

  /**
   * Construct a new Person object.
   * @param   jsondata all the data for this object
   */
  constructor(jsondata: ConfPerson) {
    this._DATA = jsondata
  }

  /**
   * The string name of this person if it exists; else the object name of this person.
   * @deprecated
   */
  get name(): object {
    return {
      givenName      : this._DATA.givenName       || this._DATA.name || '',
      familyName     : this._DATA.familyName      || '',
      additionalName : this._DATA.additionalName  || '',
      honorificPrefix: this._DATA.honorificPrefix || '',
      honorificSuffix: this._DATA.honorificSuffix || '',
    }
  }

	/**
	 * Return this person’s name in "FullName, Director of ... | 555-555-5555" format.
	 * HTML output
	 * @todo TODO move this to Utils
	 */
	view_contact(): string {
		return new xjs.DocumentFragment(person_contact_processor.process(this._DATA)).innerHTML()
	}
}
