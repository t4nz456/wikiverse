import React from 'react';
import { Page } from './Page';
import {useState, useEffect} from "react";

export const PagesList = ({pages, onPageClick}) => {
	return <>
		{
			pages.map((page, idx) => {
				return <Page page={page} key={idx} onClick={() => onPageClick(page.slug)} />
			})
		}
	</>
};

export default PagesList;