import React from 'react';
import {connect} from 'react-redux';

import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';

class Beach extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.Viewer.fitToViewer('center', 'center');
	}

	render() {
		const {showPath, showStart, showEnd, showIntersections, showOverlap} = this.props;

		const path = this.props.path.map((xy) => [xy[0], -xy[1]]);
		const points = path.map((xy) => `${xy[0]},${xy[1]}`).join(' ');

		const mn = path.reduce((acc, xy) => [Math.min(acc[0], xy[0]), Math.min(acc[1], xy[1])], [0, 0]);
		const mx = path.reduce((acc, xy) => [Math.max(acc[0], xy[0]), Math.max(acc[1], xy[1])], [0, 0]);

		const x0 = mn[0] - 1; const width = mx[0] - mn[0] + 2;
		const y0 = mn[1] - 1; const height = mx[1] - mn[1] + 2;

		const viewBox = `${x0} ${y0} ${width} ${height}`;

		const intersections = this.props.intersections
			.filter(v => typeof v[0] === 'number')
			.map((p, index) => (<circle key={index} cx={p[0]} cy={-p[1]} r={0.25} />))
		;

		const overlaps = this.props.intersections
			.filter(v => Array.isArray(v[0]) && typeof v[0][0] === 'number')
			.map(([p0, p1], index) => (<line key={index} x1={p0[0]} y1={-p0[1]} x2={p1[0]} y2={-p1[1]} />))
		;

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
					{showPath ? (
						<polyline className='path' points={points}>
							<title>Path</title>
						</polyline>
					): null}
					{showOverlap ? (
						<g className='overlaps'>
							<title>Overlap</title>
							{overlaps}
						</g>
					) : null}
					{showStart ? (
						<circle className='start' cx={path[0][0]} cy={path[0][1]} r={0.5}>
							<title>Start</title>
						</circle>
					) : null}
					{showEnd ? (
						<circle className='end' cx={path[path.length-1][0]} cy={path[path.length-1][1]} r={0.5}>
							<title>End</title>
						</circle>
					) : null}
					{showIntersections ? (
						<g className='intersections'>
							<title>Intersection</title>
							{intersections}
						</g>
					) : null}
				</svg>
			</UncontrolledReactSVGPanZoom>
		);
	}
}

function mapStateToProps(state) {
	return state.settings;
}

export default connect(mapStateToProps, {})(Beach);
