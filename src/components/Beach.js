import React from 'react';
import {connect} from 'react-redux';

import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';

export default class Beach extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.Viewer.fitToViewer('center', 'center');
	}

	render() {
		const path = this.props.path.map((xy) => [xy[0], -xy[1]]);
		const points = path.map((xy) => `${xy[0]},${xy[1]}`).join(' ');

		const mn = path.reduce((acc, xy) => [Math.min(acc[0], xy[0]), Math.min(acc[1], xy[1])], [0, 0]);
		const mx = path.reduce((acc, xy) => [Math.max(acc[0], xy[0]), Math.max(acc[1], xy[1])], [0, 0]);

		const x0 = mn[0] - 1; const width = mx[0] - mn[0] + 2;
		const y0 = mn[1] - 1; const height = mx[1] - mn[1] + 2;

		const viewBox = `${x0} ${y0} ${width} ${height}`;

		const isec = this.props.intersections.map((p, index) => (
			<circle key={index} className='isec' cx={p[0]} cy={-p[1]} r={0.25} />
		));

		return (
			<UncontrolledReactSVGPanZoom
				ref={el=>this.Viewer=el}
				className='beach'
				width={this.props.width}
				height={this.props.height}
				background='none'
				SVGBackground='none'
				detectAutoPan={false}
				toolbarProps={{
					SVGAlignX: 'center',
					SVGAlignY: 'center',
				}}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox={viewBox}
					width={`${width}cm`}
					width={`${height}cm`}
					preserveAspectRatio='xMidYMid meet'
				>
					<polyline className='path' points={points} />
					<circle className='start' cx={path[0][0]} cy={path[0][1]} r={0.5} />
					<circle className='end' cx={path[path.length-1][0]} cy={path[path.length-1][1]} r={0.5} />
					{isec}
				</svg>
			</UncontrolledReactSVGPanZoom>
		);
	}
}
