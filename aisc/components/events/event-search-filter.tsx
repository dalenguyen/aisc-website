import { useState, useEffect, useRef } from 'react';
import { getQueryStringValue, mobileCheck } from '../../../common/utils';
import isEmpty from 'lodash/isEmpty';
import { EventType } from '../../../common/types';
import './event-search-filter.scss';

import {
  InputGroup, DropdownButton, Dropdown, FormControl,
  Form, Button
} from 'react-bootstrap';


export interface Filter {
  searchText: string | ""
  subject: string | 'all'
  stream: EventType | 'all'
}

export const EMPTY_FILTER: Filter = {
  searchText: "", subject: "all", stream: "all"
};


export default ({
  subject: initSubject = 'all',
  searchText: initSearchText = '',
  stream: initStream = 'all',
  onChange = () => undefined,
  subjects = [],
  streams = [] }:
  ({
    onChange: (f: Filter) => void, subjects: string[],
    streams: string[]
  } & Filter)
) => {
  const [currFilter, setFilter] = useState({
    subject: initSubject,
    searchText: initSearchText,
    stream: initStream
  });

  const { searchText, subject, stream } = currFilter;

  const onSearchChange = (e: any) => {
    const newVal = e.target.value;

    setFilter(Object.assign({}, currFilter, { searchText: newVal }));
  }

  const onSubjectChange = (newVal: string) => {
    setFilter(Object.assign({}, currFilter, { subject: newVal }));
  }
  const onStreamChange = (newVal: string) => {
    setFilter(Object.assign({}, currFilter, { stream: newVal }));
  }

  const clearFilter = () => {
    setFilter(EMPTY_FILTER);
  }

  // apply filter to event list
  useEffect(() => {
    onChange(currFilter);
  }, [searchText, subject, stream]);

  useEffect(() => {
    const subjectFromURL = getQueryStringValue('subject');
    if (subjectFromURL) {
      setFilter(Object.assign({}, currFilter, { subject: subjectFromURL }));
    }
  }, []);

  const searchElem = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isMobile = mobileCheck();
    if (!isMobile && searchElem.current) {
      searchElem.current.focus();
    }
  }, [])

  return (
    <Form inline className="form-inline">
      <InputGroup className="mb-2 mr-sm-2" size="lg">
        <InputGroup.Text
          as={InputGroup.Prepend}
        >
          <i className="fa fa-search"></i>
        </InputGroup.Text>
        <FormControl
          onChange={onSearchChange}
          value={searchText}
          ref={searchElem}
          placeholder="Search all events"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-2 mr-sm-2" >
        <DropdownButton
          id="subject-filter"
          size="lg"
          className="ml-1 mr-1"
          variant={subject === 'all' ? 'outline-secondary' : 'success'}
          title={subject === 'all' ? 'By subject' : subject}
          value={subject}
        >
          <Dropdown.Item
            value="all"
            onSelect={() => onSubjectChange('all')}
          >All</Dropdown.Item>
          <Dropdown.Divider />
          {
            subjects.map(s => (
              <Dropdown.Item
                key={s}
                onSelect={() => onSubjectChange(s)}>{s}</Dropdown.Item>
            ))
          }
        </DropdownButton>
        <DropdownButton
          id="stream-filter"
          size="lg"
          className="ml-1 mr-1"
          variant={stream === 'all' ? 'outline-secondary' : 'success'}
          title={stream === 'all' ? 'By stream' : stream}
          value={stream}
        >
          <Dropdown.Item
            value="all"
            onSelect={() => onStreamChange('all')}
          >All</Dropdown.Item>
          <Dropdown.Divider />
          {
            streams.map(s => (
              <Dropdown.Item
                key={s}
                onSelect={() => onStreamChange(s)}>
                {s}
              </Dropdown.Item>
            ))
          }
        </DropdownButton>
        {!isFilterClean(currFilter) && (
          <Button
            className="ml-1 mr-1"
            variant="outline-success"
            size="lg"
            onClick={clearFilter}
          >
            <i className="fa fa-times"></i>
          </Button>
        )}
      </InputGroup>


    </Form>
  );
}




export function isFilterClean(f: Filter) {
  return !Object.keys(f).some(k => {
    if (k === 'subject') {
      return f[k] !== 'all'
    } else if (k === 'stream') {
      return f[k] !== 'all'
    } else {
      return !isEmpty(f[k])
    }
  });
}
