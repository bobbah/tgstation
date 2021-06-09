/**
 * @file
 * @copyright 2021 bobbahbrown
 * @license MIT
 */

import { BooleanLike, pureComponentHooks } from "../../common/react";
import { createVNode } from 'inferno';
import { ChildFlags, VNodeFlags } from 'inferno-vnode-flags';
import { BoxProps, computeBoxClassName, computeBoxProps, styleMapperByPropName } from "./Box";

export interface ImageProps extends BoxProps {
  alt?: string | BooleanLike;
  src?: string | BooleanLike;
  srcset?: string | BooleanLike;
  sizes?: string | BooleanLike;
  crossorigin?: string | BooleanLike;
  usemap?: string | BooleanLike;
  ismap?: BooleanLike;
  referrerpolicy?: string | BooleanLike;
  decoding?: string | BooleanLike;
  loading?: string | BooleanLike;
  pixelated?: boolean;
};

const mapRawPropTo = attrName => (style, value) => {
  if (typeof value === 'number' || typeof value === 'string') {
    style[attrName] = value;
  }
};

const styleMapperByPropNameImage = {
  // From <img> tag
  alt: mapRawPropTo('alt'),
  src: mapRawPropTo('src'),
  srcset: mapRawPropTo('srcset'),
  sizes: mapRawPropTo('sizes'),
  crossorigin: mapRawPropTo('crossorigin'),
  usemap: mapRawPropTo('usemap'),
  ismap: mapRawPropTo('ismap'),
  referrerpolicy: mapRawPropTo('referrerpolicy'),
  decoding: mapRawPropTo('decoding'),
  loading: mapRawPropTo('loading'),
  // Utility
  pixelated: (style, value) => {
    if (value) {
      style['-ms-interpolation-mode'] = 'nearest-neighbor';
      style['image-rendering'] = 'pixelated';
    }
  },
  // Include all of box props
  ...styleMapperByPropName
}

export const Image = (props: ImageProps) => {
  const {
    as = 'img',
    className,
    ...rest
  } = props;

  // Render props
  const computedClassName = typeof className === 'string'
    ? className + ' ' + computeBoxClassName(rest)
    : computeBoxClassName(rest);
  const computedProps = computeBoxProps(rest, styleMapperByPropNameImage);

  // Render wrapper element
  return createVNode(
    VNodeFlags.HtmlElement,
    as,
    computedClassName,
    [], // image tags don't have children
    ChildFlags.UnknownChildren,
    computedProps
  );
};

Image.defaultHooks = pureComponentHooks;
