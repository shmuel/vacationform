package io.pivotal;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by pivotal on 3/15/16.
 */
public class VacationRequest {

    public List<VacationPlan> vacationPlans;
    private String name;
    private int weeks;
    private int ptoDays;

    public VacationRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getWeeks() {
        return weeks;
    }

    public void setWeeks(int weeks) {
        this.weeks = weeks;
    }

    public int getPtoDays() {
        return ptoDays;
    }

    public void setPtoDays(int ptoDays) {
        this.ptoDays = ptoDays;
    }

    @Override
    public String toString() {
        return "VacationRequest{" +
                "vacationPlans=" + vacationPlans +
                ", name='" + name + '\'' +
                ", weeks=" + weeks +
                ", ptoDays=" + ptoDays +
                '}';
    }

    public void stripPlans() {
        List<VacationPlan> collect = vacationPlans.stream()
                .filter(vacationPlan -> !(vacationPlan.getFromDate().equals("") || vacationPlan.getToDate().equals("")))
                .collect(Collectors.toList());
        vacationPlans = collect;
    }
}
