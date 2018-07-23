import * as d3 from "d3";
import {component} from "d3-component";

export {drawPie};

// Helper functions
const arc = d3.arc().innerRadius(0);
const slice = component("path")
    .render((selection, slice) => {
        selection
            .attr("d", arc(slice))
            .attr("fill", slice.data.color)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .attr("stroke-linejoin", "round");
    });
const pie = component("g")
    .render((selection, {
        radius,
        slices,
    }) => {
        const d3Slices = d3.pie()
            .value(d => d.value)
            .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
            (slices);
        arc.outerRadius(radius);
        selection
            .call(slice, d3Slices);
    });

/**
 * Draws one pie chart on the provided SVG
 * @param svg {Selection} - D3 selection of the target SVG
 * @param x {number} - X coordinate of the pie chart center
 * @param y {number} - Y coordinate of the pie chart center
 * @param radius {number} - Radius of the pie chart
 * @param slices {{value: number, color: string, sortKey: (number|string)}[]} - List of pie chart slices, each
 *      containing the value of the slice, its color and some sortable key which determines the clockwise order of the
 *      slices. The value of a slice divided by the total value of all slices determines its fraction in the chart.
 */
function drawPie(svg, x, y, radius, slices) {
    svg.append("g")
        .attr("transform", `translate(${x}, ${y})`)
        .call(pie, {slices}, {
            radius: radius
        });
}