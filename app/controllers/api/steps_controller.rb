class StepsController < ApplicationController
  def index
    @steps = Todo.find(params[:todo_id]).steps
    render :json: @todos:to_json
  end

  def create
    @step = Step.new(step_params)
    @step.save!
    render json: @step.to_json
  end

  def update
    @step = Step.find(params[:id])
    @step.update!(step_params)
    render json: @step.to_json
  end

  def destroy
    @step = Step.find(params[:id])
    render json: @todo.destroy!
  end

  def step_params
    params.require(:step).permit(:step, :done, :todo_id)
  end
end
